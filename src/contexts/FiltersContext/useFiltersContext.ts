import { useContext } from 'react';

import { FiltersContext } from './FiltersContext';

export const useFiltersContext = () => {
  return useContext(FiltersContext);
};
