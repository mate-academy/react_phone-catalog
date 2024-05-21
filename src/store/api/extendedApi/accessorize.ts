import { Accessorize } from '../../../utils/types/Accessorize';
import { api } from '../api';

export const extendedApiAccessorize = api.injectEndpoints({
  endpoints: build => ({
    getAccessories: build.query<Accessorize[], void>({
      query: () => 'accessories.json',
    }),
  }),
  overrideExisting: false,
});

export const { useGetAccessoriesQuery } = extendedApiAccessorize;
