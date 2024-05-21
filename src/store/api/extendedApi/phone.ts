import { Gadget } from '../../../utils/types/Gadget';
import { api } from '../api';

export const extendedApiAccessorize = api.injectEndpoints({
  endpoints: build => ({
    getAccessories: build.query<Gadget[], void>({
      query: () => 'phones.json',
    }),
  }),
  overrideExisting: false,
});
