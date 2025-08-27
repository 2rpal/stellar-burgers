import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getUserApi,
  updateUserApi,
  TRegisterData
} from '../../utils/burger-api';
import { TUser } from '../../utils/types';
import { RootState } from '../rootReducer';

type UserState = {
  data: TUser | null;
  loading: boolean; // загрузка профиля
  updating: boolean; // отправка "Сохранить"
  error: string | null;
};

const initialState: UserState = {
  data: null,
  loading: false,
  updating: false,
  error: null
};

export const fetchUser = createAsyncThunk<TUser>(
  'user/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getUserApi(); // { success, user }
      return res.user;
    } catch (e: any) {
      return rejectWithValue(e?.message ?? 'Failed to load user');
    }
  }
);

export const updateUser = createAsyncThunk<TUser, Partial<TRegisterData>>(
  'user/update',
  async (changes, { rejectWithValue }) => {
    try {
      const res = await updateUserApi(changes); // { success, user }
      return res.user;
    } catch (e: any) {
      return rejectWithValue(e?.message ?? 'Failed to update user');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchUser.pending, (s) => {
      s.loading = true;
      s.error = null;
    });
    b.addCase(fetchUser.fulfilled, (s, a: PayloadAction<TUser>) => {
      s.loading = false;
      s.data = a.payload;
    });
    b.addCase(fetchUser.rejected, (s, a) => {
      s.loading = false;
      s.error = String(a.payload ?? a.error.message ?? 'Unknown error');
    });

    b.addCase(updateUser.pending, (s) => {
      s.updating = true;
      s.error = null;
    });
    b.addCase(updateUser.fulfilled, (s, a: PayloadAction<TUser>) => {
      s.updating = false;
      s.data = a.payload;
    });
    b.addCase(updateUser.rejected, (s, a) => {
      s.updating = false;
      s.error = String(a.payload ?? a.error.message ?? 'Unknown error');
    });
  }
});

export default userSlice.reducer;

// селекторы
export const selectUser = (s: RootState) => s.user.data;
export const selectUserLoading = (s: RootState) => s.user.loading;
export const selectUserUpdating = (s: RootState) => s.user.updating;
export const selectUserError = (s: RootState) => s.user.error;
