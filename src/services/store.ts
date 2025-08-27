import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import rootReducer, { RootState } from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type AppDispatch = typeof store.dispatch;

// ВАЖНО: не вызываем dispatchHook(), а передаём сам хук — так он типизируется правильно
export const useDispatch: () => AppDispatch = dispatchHook as () => AppDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
