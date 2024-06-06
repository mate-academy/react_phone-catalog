// eslint-disable-next-line max-len
import { convertSelectDataToSelectOptions } from '../../../../helpers/convertSelectDataToSelectOptions';
import { SelectOption } from '../../../../types';
import {
  SORT_SELECT_DATA,
  SORT_SELECT_DEFAULT_KEY,
  TAKE_SELECT_DATA,
  TAKE_SELECT_DEFAULT_KEY,
} from '../../variables';

export const sortOptions: SelectOption[] =
  convertSelectDataToSelectOptions(SORT_SELECT_DATA);

export const defaulSortOption: SelectOption = {
  label: SORT_SELECT_DATA[SORT_SELECT_DEFAULT_KEY],
  value: SORT_SELECT_DEFAULT_KEY,
};

export const takeOptions: SelectOption[] =
  convertSelectDataToSelectOptions(TAKE_SELECT_DATA);

export const defaulTakeOption: SelectOption = {
  label: TAKE_SELECT_DATA[TAKE_SELECT_DEFAULT_KEY],
  value: SORT_SELECT_DEFAULT_KEY,
};
