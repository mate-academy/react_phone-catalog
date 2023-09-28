import { NamesByLinks } from '../types/NamesByLinks';
import { DEF_SORT } from './consts';

type CustomType = {
  pathname: string,
  search: string,
};

export const getBackLink = (state: CustomType) => {
  return {
    pathname: state ? state.pathname : NamesByLinks.Phones,
    search: state ? state.search : DEF_SORT,
  };
};
