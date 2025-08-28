import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredientsSlice';
import feedReducer from './slices/feedSlice';
import constructorReducer from './slices/constructorSlice';
import orderReducer from './slices/orderSlice';
import orderDetailsReducer from './slices/orderDetailsSlice';
import userReducer from './slices/userSlice';
import profileOrdersReducer from './slices/profileOrdersSlice';
import authReducer from './slices/authSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  feed: feedReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  orderDetails: orderDetailsReducer,
  user: userReducer,
  profileOrders: profileOrdersReducer,
  auth: authReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
