import { SearchParams } from '../modules/shared/utils';

export type DropdownItem = {
  label: string;
  params: SearchParams;
  value: string;
};
