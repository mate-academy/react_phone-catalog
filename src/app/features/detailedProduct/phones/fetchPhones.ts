import { createAsyncThunk } from '@reduxjs/toolkit';

import { removeWhiteSpaces } from '../../../../utils/removeWhiteSpaces';
import { delay } from '../../../../utils/delay';
import { AppState } from '../../../store';
import { Phone } from '../../../../types';

export const fetchPhones = createAsyncThunk<Phone[]>(
  'phones/fetch',
  async (_arg, api) => {
    await delay(1000);

    const response = await fetch('api/phones.json', {
      signal: api.signal,
    });

    if (response.ok) {
      const phones = (await response.json()) as Phone[];

      return phones.map(phone =>
        removeWhiteSpaces(phone, 'colorsAvailable', 'color'),
      );
    }

    throw new Error(response.statusText);
  },
  {
    condition(_a, api) {
      return (api.getState() as AppState).phones.status !== 'pending';
    },
  },
);
