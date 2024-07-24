import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CategoriesState {
  categoryId: number;
  categories: string[];
}

const initialState: CategoriesState = {
  categoryId: localStorage.getItem('categoryId')
    ? Number(localStorage.getItem('categoryId'))
    : 0,
  categories: JSON.parse(
    localStorage.getItem('categories') ||
      '["phones", "tablets", "accessories"]',
  ),
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
      localStorage.setItem('categoryId', action.payload.toString());
    },
    setCategories(state, action: PayloadAction<string[]>) {
      state.categories = action.payload;
      localStorage.setItem('categories', JSON.stringify(action.payload));
    },
  },
});

export const { setCategoryId, setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
