import { createAsyncThunk } from '@reduxjs/toolkit';

import { removeWhiteSpaces } from '../../../../utils/removeWhiteSpaces';
import { delay } from '../../../../utils/delay';
import { AppState } from '../../../store';
import { Accessory } from '../../../../types';

export const fetchAccessories = createAsyncThunk<Accessory[]>(
  'accessories/fetch',
  async (_arg, api) => {
    await delay(300);

    const response = await fetch('api/accessories.json', {
      signal: api.signal,
    });

    if (response.ok) {
      const accessories = (await response.json()) as Accessory[];

      return accessories.map(accessory =>
        removeWhiteSpaces(accessory, 'colorsAvailable', 'color'),
      );
    }

    throw new Error(response.statusText);
  },
  {
    condition(_a, api) {
      return (api.getState() as AppState).accessories.status !== 'pending';
    },
  },
);
