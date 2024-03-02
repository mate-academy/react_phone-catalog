import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TypeCard } from "../types/TypeCard";
import { ItemTypeCard } from "../types/ItemTypeCard";

export interface T {
  loaded: boolean;
  hasError: boolean;
  items: TypeCard[];
  selectedPhone: ItemTypeCard | null;
  searchFilter: string;
}

export const initialState: T = {
  loaded: false,
  hasError: false,
  items: [] as TypeCard[],
  selectedPhone: null,
  searchFilter: "",
};

export const selectPhone = createAsyncThunk(
  "phones/id",

  async (id: string) => {
    const response = await fetch(
      `https://mate-academy.github.io/react_phone-catalog/_new/products/${id}.json`,
    );

    const data = await response.json();

    return data;
  },
);

export const init = createAsyncThunk(
  "phones/init",

  async () => {
    const response = await fetch(
      "https://mate-academy.github.io/react_phone-catalog/_new/products.json",
    );

    const data = await response.json();

    return data;
  },
);

export const phonesSlice = createSlice({
  name: "phones",
  initialState,
  reducers: {
    setSearchFilter: (state, action) => {
      return {
        ...state,
        searchFilter: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    /* eslint-disable no-param-reassign */

    builder.addCase(selectPhone.fulfilled, (state, action) => {
      state.selectedPhone = action.payload;
    });
    builder.addCase(init.pending, (state) => {
      state.loaded = true;
      state.hasError = false;
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.loaded = false;
      state.items = action.payload;
    });
    builder.addCase(init.rejected, (state) => {
      state.loaded = false;
      state.hasError = true;
    });
  },
});

export const { setSearchFilter } = phonesSlice.actions;
export default phonesSlice.reducer;
