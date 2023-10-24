import { createSlice } from '@reduxjs/toolkit';

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    name: '',
    parentCategory: '',
    editedCategory: null,
    categories: [],
    sortedCategories: [],
    properties: [],
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
      state.sortedCategories = action.payload.slice().sort((a, b) => {
        return a.name.toLowerCase() < b.name.toLowerCase()
          ? -1
          : a.name.toLowerCase() > b.name.toLowerCase()
          ? 1
          : 0;
      });
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setParentCategory: (state, action) => {
      state.parentCategory = action.payload;
    },
    setEditedCategory: (state, action) => {
      state.editedCategory = action.payload;
    },
    setProperties: (state, action) => {
      state.properties = action.payload;
    },
    addProperty: (state, action) => {
      state.properties.push({ name: '', values: '' });
    },
  },
});

export const {
  setCategories,
  setName,
  setParentCategory,
  setEditedCategory,
  setProperties,
  addProperty,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;
