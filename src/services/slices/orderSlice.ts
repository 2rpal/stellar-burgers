import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';
import { RootState } from '../rootReducer';

type OrderState = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
};

const initialState: OrderState = {
  orderRequest: false,
  orderModalData: null,
  error: null
};

export const placeOrderThunk = createAsyncThunk<TOrder, string[]>(
  'order/place',
  async (ids, { rejectWithValue }) => {
    try {
      const res = await orderBurgerApi(ids);
      return res.order;
    } catch (e: any) {
      return rejectWithValue(e?.message ?? 'Order failed');
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    closeOrderModal(state) {
      state.orderModalData = null;
    }
  },
  extraReducers: (b) => {
    b.addCase(placeOrderThunk.pending, (s) => {
      s.orderRequest = true;
      s.error = null;
    });
    b.addCase(placeOrderThunk.fulfilled, (s, a: PayloadAction<TOrder>) => {
      s.orderRequest = false;
      s.orderModalData = a.payload;
    });
    b.addCase(placeOrderThunk.rejected, (s, a) => {
      s.orderRequest = false;
      s.error = String(a.payload ?? a.error.message ?? 'Unknown error');
    });
  }
});

export const { closeOrderModal } = orderSlice.actions;
export default orderSlice.reducer;

export const selectOrderRequest = (s: RootState) => s.order.orderRequest;
export const selectOrderModalData = (s: RootState) => s.order.orderModalData;
