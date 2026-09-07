/* eslint-disable */
import phonesFromServer from '../../../public/api/phones.json';
import tabletsFromServer from '../../../public/api/tablets.json';
import accessoriesFromServer from '../../../public/api/accessories.json';
import { Item } from '../../types/Item';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  item: Item | null;
};

const initialState: InitialState = {
  item: null,
};

const getPhone = (idItem: string) => {
  return phonesFromServer.find(item => item.name === idItem);
};

const getTablet = (idItem: string) => {
  return tabletsFromServer.find(item => item.name === idItem);
};

const getAccessories = (idItem: string) => {
  return accessoriesFromServer.find(item => item.name === idItem);
};

const onChangeColor = (item: Item | null): Item[] | null => {
  if (!item) {
    return null;
  }

  const dataMap: Record<string, Item[]> = {
    phones: phonesFromServer,
    tablets: tabletsFromServer,
    accessories: accessoriesFromServer,
  };

  return (
    dataMap[item.category]?.filter(
      p => p.namespaceId === item.namespaceId && p.capacity === item.capacity,
    ) || null
  );
};

const onChangeCapacity = (item: Item | null): Item[] | null => {
  if (!item) {
    return null;
  }

  const dataMap: Record<string, Item[]> = {
    phones: phonesFromServer,
    tablets: tabletsFromServer,
    accessories: accessoriesFromServer,
  };

  return (
    dataMap[item.category]?.filter(
      p => p.namespaceId === item.namespaceId && p.color === item.color,
    ) || null
  );
};

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    selectPhone: (state, action: PayloadAction<string>) => {
      const phone = getPhone(action.payload);

      if (phone) {
        state.item = phone;
      } else {
        console.error(`Phone with name ${action.payload} not found`);
      }
    },
    selectTablet: (state, action: PayloadAction<string>) => {
      const tablet = getTablet(action.payload);

      if (tablet) {
        state.item = tablet;
      } else {
        console.error(`Tablet with name ${action.payload} not found`);
      }
    },
    selectAccessories: (state, action: PayloadAction<string>) => {
      const accessories = getAccessories(action.payload);

      if (accessories) {
        state.item = accessories;
      } else {
        console.error(`Accessories with name ${action.payload} not found`);
      }
    },
    selectColor: (state, action: PayloadAction<string>) => {
      const products = onChangeColor(state.item);

      if (products) {
        const selectedItem = products.find(p => p.color === action.payload);

        if (selectedItem) {
          state.item = selectedItem;
        } else {
          console.log('Error: No item with selected color found');
        }
      } else {
        console.log('Error: No matching products found');
      }
    },
    selectCapacity: (state, action: PayloadAction<string>) => {
      const products = onChangeCapacity(state.item);

      if (products) {
        const selectedItem = products.find(p => p.capacity === action.payload);

        if (selectedItem) {
          state.item = selectedItem;
        } else {
          console.error('Error: No item with selected capacity found');
        }
      } else {
        console.error('Error: No matching products found');
      }
    },
  },
});

export default itemSlice;
