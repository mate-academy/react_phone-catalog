import { Gadget } from '../../../utils/types/Gadget';
import { api } from '../api';

export const extendedApiTablet = api.injectEndpoints({
  endpoints: build => ({
    getTablets: build.query<Gadget[], void>({
      query: () => 'tablets.json',
    }),
  }),
  overrideExisting: false,
});

export const { useGetTabletsQuery } = extendedApiTablet;
