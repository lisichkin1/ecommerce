import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    productProperties: {},
  },
  reducers: {
    setProductProperties: (state, action) => {
      state.productProperties = action.payload;
    },
  },
});

export const { setProductProperties } = productSlice.actions;
export default productSlice.reducer;
