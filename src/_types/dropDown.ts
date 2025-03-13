import { SearchParams } from '../_utils/getSearchWith';

export type DropdownItem = {
  label: string;
  params: SearchParams;
  value: string;
};
