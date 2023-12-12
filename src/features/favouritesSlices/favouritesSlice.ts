import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { Phone } from '../../types/Phone';
import type { RootState } from '../../app/store';

const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/';

type Params = {
  phone: Phone[],
  favourites: Phone[],
  quantityFavourites: number,
  status: string,
};

const initialState: Params = {
  phone: [],
  status: 'idle',
  favourites: [],
  quantityFavourites: 0,
};

export const fetchPhones = createAsyncThunk<Phone[]>(
  'favourites/fetchPhones',
  async () => {
    const res = await axios.get<Phone[]>(`${BASE_URL}/products.json`);

    return res.data;
  },
);

export const fetchPhoneDetail = createAsyncThunk<Phone, string>(
  'favourites/fetchPhoneDetail',
  async (id: string) => {
    const res = await axios.get<Phone>(`${BASE_URL}/products.json/${id}`);

    return res.data;
  },
);

const favouritesSlices = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    restorePhones(state, action: PayloadAction<Phone[]>) {
      state.phone = action.payload;
    },
    addToFavourites(state, action: PayloadAction<Phone>) {
      const hasPhones = state.favourites.find(
        (phones) => phones.phoneId === action.payload.phoneId,
      );

      if (!hasPhones) {
        state.favourites.push({
          ...action.payload,
          selected: !action.payload.selected,
        });
        state.quantityFavourites += 1;
      } else {
        state.favourites = state.favourites.filter(
          (phones) => phones.phoneId !== action.payload.phoneId,
        );
        state.quantityFavourites -= 1;
      }

      state.phone = state.phone.map((phone) => {
        return phone.phoneId === action.payload.phoneId
          ? { ...phone, selected: !hasPhones?.selected }
          : phone;
      });
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchPhones.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.phone = state.phone.concat(action.payload);
    });
  },
});

export const selectFavourites
 = (state: RootState) => state.favourites.favourites;
export const selectQuantityFavourites
  = (state: RootState) => state.favourites.quantityFavourites;
export const selectStatus = (state: RootState) => state.favourites.status;
export const selectPhones = (state: RootState) => state.favourites.phone;
export const { addToFavourites, restorePhones } = favouritesSlices.actions;
export default favouritesSlices.reducer;
