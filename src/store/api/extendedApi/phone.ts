import { Gadget } from '../../../utils/types/Gadget';
import { api } from '../api';

export const extendedApiPhones = api.injectEndpoints({
  endpoints: build => ({
    getPhones: build.query<Gadget[], void>({
      query: () => 'phones.json',
    }),
  }),
  overrideExisting: false,
});

export const { useGetPhonesQuery } = extendedApiPhones;
