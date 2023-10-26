import { configureStore } from '@reduxjs/toolkit';
import categorySlice from '@/redux/slices/categorySlice';
import productSlice from '@/redux/slices/productSlice';
export const store = configureStore({
  reducer: { categorySlice, productSlice },
});
