import {createSlice, PayloadAction, Slice} from "@reduxjs/toolkit";
import {Category} from "../types/Category";

type CategoriesState = {
  categories: Category[];
};

const initialState: CategoriesState = {
  categories: [],
};

export const categoriesSlice: Slice<CategoriesState> = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, {payload}: PayloadAction<Category[]>) => {
      state.categories = payload;
    },
  },
});

export const {reducer, actions} = categoriesSlice;
