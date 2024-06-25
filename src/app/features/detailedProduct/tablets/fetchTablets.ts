import { createAsyncThunk } from '@reduxjs/toolkit';

import { removeWhiteSpaces } from '../../../../utils/removeWhiteSpaces';
import { delay } from '../../../../utils/delay';
import { AppState } from '../../../store';
import { Tablet } from '../../../../types';

export const fetchTablets = createAsyncThunk<Tablet[]>(
  'tablets/fetch',
  async (_arg, api) => {
    await delay(1000);

    const response = await fetch('api/tablets.json', {
      signal: api.signal,
    });

    if (response.ok) {
      const tablets = (await response.json()) as Tablet[];

      return tablets.map(tablet =>
        removeWhiteSpaces(tablet, 'colorsAvailable', 'color'),
      );
    }

    throw new Error(response.statusText);
  },
  {
    condition(_a, api) {
      return (api.getState() as AppState).tablets.status !== 'pending';
    },
  },
);
