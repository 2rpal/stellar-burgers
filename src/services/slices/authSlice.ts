import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  loginUserApi,
  registerUserApi,
  logoutApi,
  TLoginData,
  TRegisterData
} from '../../utils/burger-api';
import { setCookie, deleteCookie } from '../../utils/cookie';
import { TUser } from '../../utils/types';
import { RootState } from '../rootReducer';
import { fetchUser } from './userSlice';

type AuthState = {
  user: TUser | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null
};

export const registerThunk = createAsyncThunk<
  TUser,
  TRegisterData,
  { rejectValue: string }
>('auth/register', async (form, { rejectWithValue, dispatch }) => {
  try {
    const res = await registerUserApi(form);
    localStorage.setItem('refreshToken', res.refreshToken);
    setCookie('accessToken', res.accessToken);
    dispatch(fetchUser());
    return res.user;
  } catch (e: any) {
    return rejectWithValue(e?.message ?? 'Registration failed');
  }
});

export const loginThunk = createAsyncThunk<
  TUser,
  TLoginData,
  { rejectValue: string }
>('auth/login', async (form, { rejectWithValue, dispatch }) => {
  try {
    const res = await loginUserApi(form);
    localStorage.setItem('refreshToken', res.refreshToken);
    setCookie('accessToken', res.accessToken);
    dispatch(fetchUser());
    return res.user;
  } catch (e: any) {
    return rejectWithValue(e?.message ?? 'Login failed');
  }
});

export const logoutThunk = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>('auth/logout', async () => {
  try {
    await logoutApi();
  } catch {
  } finally {
    localStorage.removeItem('refreshToken');
    deleteCookie('accessToken');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthedUser(state, action: PayloadAction<TUser | null>) {
      state.user = action.payload;
      state.error = null;
    },
    clearAuthError(state) {
      state.error = null;
    }
  },
  extraReducers: (b) => {
    b.addCase(registerThunk.pending, (s) => {
      s.loading = true;
      s.error = null;
    });
    b.addCase(registerThunk.fulfilled, (s, a) => {
      s.loading = false;
      s.user = a.payload;
    });
    b.addCase(registerThunk.rejected, (s, a) => {
      s.loading = false;
      s.error = a.payload ?? null;
    });

    b.addCase(loginThunk.pending, (s) => {
      s.loading = true;
      s.error = null;
    });
    b.addCase(loginThunk.fulfilled, (s, a) => {
      s.loading = false;
      s.user = a.payload;
    });
    b.addCase(loginThunk.rejected, (s, a) => {
      s.loading = false;
      s.error = a.payload ?? null;
    });

    b.addCase(logoutThunk.fulfilled, (s) => {
      s.user = null;
      s.error = null;
    });
  }
});

export const { setAuthedUser, clearAuthError } = authSlice.actions;
export default authSlice.reducer;

// Селекторы
export const selectAuthUser = (s: RootState) => s.auth.user;
export const selectAuthLoading = (s: RootState) => s.auth.loading;
export const selectAuthError = (s: RootState) => s.auth.error;

export const selectIsAuthed = (s: RootState) =>
  Boolean(s.auth.user) || /(?:^|; )accessToken=/.test(document.cookie);
