import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';
import { RootState } from '../rootReducer';

type FeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
};

const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

type FeedsPayload = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export const fetchFeed = createAsyncThunk<FeedsPayload>(
  'feed/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getFeedsApi(); // { orders, total, totalToday }
      return {
        orders: data.orders,
        total: data.total,
        totalToday: data.totalToday
      };
    } catch (e: any) {
      return rejectWithValue(e?.message ?? 'Failed to load feed');
    }
  }
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchFeed.fulfilled,
        (state, action: PayloadAction<FeedsPayload>) => {
          state.orders = action.payload.orders;
          state.total = action.payload.total;
          state.totalToday = action.payload.totalToday;
          state.loading = false;
        }
      )
      .addCase(fetchFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = String(
          action.payload ?? action.error.message ?? 'Unknown error'
        );
      });
  }
});

export default feedSlice.reducer;

// Селекторы:
export const selectFeedOrders = (s: RootState) => s.feed.orders;
export const selectFeedTotal = (s: RootState) => s.feed.total;
export const selectFeedTotalToday = (s: RootState) => s.feed.totalToday;
export const selectFeedLoading = (s: RootState) => s.feed.loading;
export const selectFeedError = (s: RootState) => s.feed.error;
