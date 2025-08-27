import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOrdersApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';
import { RootState } from '../rootReducer';

type ProfileOrdersState = {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
};

const initialState: ProfileOrdersState = {
  orders: [],
  loading: false,
  error: null
};

export const fetchProfileOrders = createAsyncThunk<TOrder[]>(
  'profileOrders/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const orders = await getOrdersApi(); // TOrder[]
      return orders;
    } catch (e: any) {
      return rejectWithValue(e?.message ?? 'Failed to load profile orders');
    }
  }
);

const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchProfileOrders.pending, (s) => {
      s.loading = true;
      s.error = null;
    });
    b.addCase(fetchProfileOrders.fulfilled, (s, a: PayloadAction<TOrder[]>) => {
      s.loading = false;
      s.orders = a.payload;
    });
    b.addCase(fetchProfileOrders.rejected, (s, a) => {
      s.loading = false;
      s.error = String(a.payload ?? a.error.message ?? 'Unknown error');
    });
  }
});

export default profileOrdersSlice.reducer;

export const selectProfileOrders = (s: RootState) => s.profileOrders.orders;
export const selectProfileOrdersLoading = (s: RootState) =>
  s.profileOrders.loading;
export const selectProfileOrdersError = (s: RootState) => s.profileOrders.error;
