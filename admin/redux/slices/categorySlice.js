import { createSlice } from '@reduxjs/toolkit';

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    name: '',
    parentCategory: '',
    editedCategory: null,
    categories: [],
    categoriesList: [],
    properties: [],
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
      state.categoriesList = action.payload.slice().sort((a, b) => {
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
      state.properties = [...state.properties, { name: '', values: '' }];
    },
    updatePropertyName: (state, action) => {
      const { index, property, newName } = action.payload;
      state.properties[index].name = newName;
    },
    updatePropertyValues: (state, action) => {
      const { index, property, newValues } = action.payload;
      state.properties[index].values = newValues;
    },
    removeProperty: (state, action) => {
      const { index } = action.payload;
      state.properties = state.properties.filter((el, indexEl) => index !== indexEl);
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
  updatePropertyName,
  updatePropertyValues,
  removeProperty,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;
