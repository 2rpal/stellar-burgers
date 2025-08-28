import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '../../utils/types';
import { RootState } from '../rootReducer';

type ConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    setBun: {
      reducer(state, action: PayloadAction<TConstructorIngredient>) {
        state.bun = action.payload;
      },
      prepare(ingredient: TIngredient) {
        return { payload: { ...ingredient, id: nanoid() } };
      }
    },

    addIngredient: {
      reducer(state, action: PayloadAction<TConstructorIngredient>) {
        state.ingredients.push(action.payload);
      },
      prepare(ingredient: TIngredient) {
        return { payload: { ...ingredient, id: nanoid() } };
      }
    },

    removeIngredient(state, action: PayloadAction<{ id: string }>) {
      state.ingredients = state.ingredients.filter(
        (i) => i.id !== action.payload.id
      );
    },

    moveIngredient(
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) {
      const { fromIndex, toIndex } = action.payload;
      if (fromIndex === toIndex) return;
      const next = [...state.ingredients];
      const [moved] = next.splice(fromIndex, 1);
      if (!moved) return;
      next.splice(toIndex, 0, moved);
      state.ingredients = next;
    },

    clear(state) {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const {
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clear
} = constructorSlice.actions;

export default constructorSlice.reducer;

export const selectConstructorItems = (s: RootState) => s.burgerConstructor;
