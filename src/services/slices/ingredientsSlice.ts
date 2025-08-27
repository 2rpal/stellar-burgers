import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '../../utils/types';
import { RootState } from '../rootReducer';

type IngredientsState = {
  items: TIngredient[];
  loading: boolean;
  error: string | null;
};

const initialState: IngredientsState = {
  items: [],
  loading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk<TIngredient[]>(
  'ingredients/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getIngredientsApi();
      return data; // массив ингредиентов
    } catch (e: any) {
      return rejectWithValue(e?.message ?? 'Failed to load ingredients');
    }
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    // если что-то локально менять будем — добавим сюда
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.items = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = String(
          action.payload ?? action.error.message ?? 'Unknown error'
        );
      });
  }
});

export default ingredientsSlice.reducer;

// Селекторы:
export const selectIngredients = (s: RootState) => s.ingredients.items;
export const selectIngredientsLoading = (s: RootState) => s.ingredients.loading;
export const selectIngredientsError = (s: RootState) => s.ingredients.error;
