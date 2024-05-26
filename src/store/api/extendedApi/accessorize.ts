import { Gadget } from '../../../utils/types/Gadget';
import { api } from '../api';

export const extendedApiAccessorize = api.injectEndpoints({
  endpoints: build => ({
    getAccessories: build.query<Gadget[], void>({
      query: () => 'accessories.json',
    }),
  }),
  overrideExisting: false,
});

export const { useGetAccessoriesQuery } = extendedApiAccessorize;
