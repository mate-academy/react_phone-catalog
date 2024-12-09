import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/product';
import { getSelectedProduct } from '../api/api';
import { Model } from '../types/model';

type InitialState = {
  selectedProduct: Model | null;
  selectedModel: Product | null;
  selectedColor: string | null;
  selectedCapacity: string | null;
  loaded: boolean;
  hasError: boolean;
};

const storedSelectedProduct = localStorage.getItem('selectedProduct');

const initialState: InitialState = {
  selectedProduct: storedSelectedProduct
    ? JSON.parse(storedSelectedProduct)
    : null,
  selectedModel: null,
  selectedColor: null,
  selectedCapacity: null,
  loaded: false,
  hasError: false,
};

export const init = createAsyncThunk(
  'selectedProduct/fetch',
  ({
    category,
    id,
    namespaceId,
    color,
    capacity,
    currentCapacity,
    currentColor,
  }: {
    category: string;
    id?: string;
    namespaceId?: string;
    color?: string;
    capacity?: string;
    currentCapacity?: string;
    currentColor?: string;
  }) => {
    return getSelectedProduct({
      category,
      id,
      namespaceId,
      color,
      capacity,
      currentCapacity,
      currentColor,
    });
  },
);

export const selectedProductSlice = createSlice({
  name: 'selectedProduct',
  initialState,
  reducers: {
    setModel: (state: InitialState, action: PayloadAction<Product | null>) => {
      state.selectedModel = action.payload;
    },

    setSelectedColor: (
      state: InitialState,
      action: PayloadAction<string | null>,
    ) => {
      state.selectedColor = action.payload;
    },

    setSelectedCapacity: (
      state: InitialState,
      action: PayloadAction<string | null>,
    ) => {
      state.selectedCapacity = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(init.pending, state => {
      return { ...state, loaded: true, hasError: false };
    });

    builder.addCase(
      init.fulfilled,
      (state, action: PayloadAction<Model | null>) => {
        state.selectedProduct = action.payload;
        state.loaded = false;
      },
    );

    builder.addCase(init.rejected, state => {
      return { ...state, loaded: false, hasError: true };
    });
  },
});

export default selectedProductSlice.reducer;
export const { setModel, setSelectedColor, setSelectedCapacity } =
  selectedProductSlice.actions;
