import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';
import { RootState } from '../rootReducer';

type OrderDetailsState = {
  data: TOrder | null;
  loading: boolean;
  error: string | null;
};

const initialState: OrderDetailsState = {
  data: null,
  loading: false,
  error: null
};

export const fetchOrderByNumber = createAsyncThunk<TOrder, number>(
  'orderDetails/fetchByNumber',
  async (number, { rejectWithValue }) => {
    try {
      const res = await getOrderByNumberApi(number); // {success, orders:[...] }
      return res.orders[0];
    } catch (e: any) {
      return rejectWithValue(e?.message ?? 'Failed to load order');
    }
  }
);

const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchOrderByNumber.pending, (s) => {
      s.loading = true;
      s.error = null;
      s.data = null;
    });
    b.addCase(fetchOrderByNumber.fulfilled, (s, a: PayloadAction<TOrder>) => {
      s.loading = false;
      s.data = a.payload;
    });
    b.addCase(fetchOrderByNumber.rejected, (s, a) => {
      s.loading = false;
      s.error = String(a.payload ?? a.error.message ?? 'Unknown error');
    });
  }
});

export default orderDetailsSlice.reducer;
export const selectOrderDetails = (s: RootState) => s.orderDetails.data;
