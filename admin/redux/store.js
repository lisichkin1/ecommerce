import { configureStore } from '@reduxjs/toolkit';
import categorySlice from '@/redux/slices/categorySlice';
export const store = configureStore({
  reducer: { categorySlice },
});
