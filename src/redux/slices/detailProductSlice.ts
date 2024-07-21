import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import detailPhones from '../../api/phones.json';
import detailTablets from '../../api/tablets.json';
import detailAccessories from '../../api/accessories.json';

interface ProductDetail {
  id: string;
  category: string;
  name: string;
  namespaceId: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: { title: string; text: string[] }[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
}

interface ProductsState {
  detailProduct: ProductDetail | null;
  detailPhones: ProductDetail[];
  detailTablets: ProductDetail[];
  detailAccessories: ProductDetail[];
}

const initialState: ProductsState = {
  detailProduct: null,
  detailPhones: detailPhones as ProductDetail[],
  detailTablets: detailTablets as ProductDetail[],
  detailAccessories: detailAccessories as ProductDetail[],
};

const detailsProductsSlice = createSlice({
  name: 'detailProduct',
  initialState,
  reducers: {
    setDetailProduct(
      state,
      action: PayloadAction<{ id: string; category: string }>,
    ) {
      const { id, category } = action.payload;

      let products: ProductDetail[] = [];

      switch (category) {
        case 'phones':
          products = state.detailPhones;
          break;
        case 'tablets':
          products = state.detailTablets;
          break;
        case 'accessories':
          products = state.detailAccessories;
          break;
        default:
          break;
      }

      state.detailProduct = products.find(product => product.id === id) || null;
    },
  },
});

export const { setDetailProduct } = detailsProductsSlice.actions;
export default detailsProductsSlice.reducer;
