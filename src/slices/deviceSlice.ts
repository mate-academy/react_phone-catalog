/* eslint-disable @typescript-eslint/indent */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllProducts, getDeviceById, getProducts } from '../api';
import { SortTypes } from '../types/sort';
import { PerPage } from '../types/perPage';
import { Devices, MergedDevice } from '../types/devices';
import { Product } from '../types/products';
import { DEFAULT_PER_PAGE, DEFAULT_SORT } from '../constants/constJS';

type DeviceState = {
  deviceList: MergedDevice[];
  selectedDevice: Devices | null;

  fetchDevicesLoading: boolean;
  fetchDevicesError: string | null;

  fetchDeviceLoading: boolean;
  fetchDeviceError: string | null;

  sort: SortTypes;
  productsPerPage: PerPage;
};

const initialState: DeviceState = {
  deviceList: [],
  selectedDevice: null,

  fetchDevicesLoading: false,
  fetchDevicesError: null,

  fetchDeviceLoading: false,
  fetchDeviceError: null,

  sort: DEFAULT_SORT,
  productsPerPage: DEFAULT_PER_PAGE,
};

const mergeDevices = (
  devices: Devices[],
  products: Product[],
): MergedDevice[] => {
  return devices.map(device => {
    const matched = products.find(p => p.itemId === device.id);

    return {
      ...device,
      ...matched,
      fullPrice: matched?.fullPrice ?? 0,
      price: matched?.price ?? 0,
      itemId: matched?.itemId ?? '',
      year: matched?.year ?? 0,
    };
  });
};

export const fetchDevicesList = createAsyncThunk<
  MergedDevice[],
  string,
  { rejectValue: string }
>('devices/fetchDevicesList', async (category, { rejectWithValue }) => {
  try {
    const devices = await getAllProducts(category);
    const products = await getProducts();

    return mergeDevices(devices, products);
  } catch {
    return rejectWithValue('Failed to load device list');
  }
});

export const fetchDeviceById = createAsyncThunk<
  Devices,
  { category: string; id: string },
  { rejectValue: string }
>('devices/fetchDeviceById', async ({ category, id }, { rejectWithValue }) => {
  try {
    const response = await getDeviceById(id, category);

    if (!response) {
      throw new Error('Device not found');
    }

    return response;
  } catch {
    return rejectWithValue('Failed to load product details');
  }
});

const deviceSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    setSortType: (state, action: PayloadAction<SortTypes>) => {
      state.sort = action.payload;
    },
    setProductsPerPage: (state, action: PayloadAction<PerPage>) => {
      state.productsPerPage =
        action.payload === 'All' ? 'All' : (Number(action.payload) as PerPage);
    },
    clearDeviceList: state => {
      state.deviceList = [];
    },
  },
  extraReducers: builder => {
    builder

      .addCase(fetchDevicesList.pending, state => {
        state.fetchDevicesLoading = true;
        state.fetchDevicesError = null;
      })
      .addCase(fetchDevicesList.fulfilled, (state, action) => {
        state.deviceList = action.payload;
        state.fetchDevicesLoading = false;
      })
      .addCase(fetchDevicesList.rejected, (state, action) => {
        state.fetchDevicesLoading = false;
        state.deviceList = [];
        state.fetchDevicesError = action.payload || 'Unknown error';
      })

      .addCase(fetchDeviceById.pending, state => {
        state.fetchDeviceLoading = true;
        state.fetchDeviceError = null;
      })
      .addCase(fetchDeviceById.fulfilled, (state, action) => {
        state.selectedDevice = action.payload;
        state.fetchDeviceLoading = false;
      })
      .addCase(fetchDeviceById.rejected, (state, action) => {
        state.selectedDevice = null;
        state.fetchDeviceLoading = false;
        state.fetchDeviceError = action.payload || 'Unknown error';
      });
  },
});

export const { setSortType, setProductsPerPage, clearDeviceList } =
  deviceSlice.actions;
export default deviceSlice.reducer;
