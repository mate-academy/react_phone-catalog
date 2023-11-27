import { SelectOption } from '../types/SelectOption';

export const getDropDownText = (
  value: string,
  selectOptions: SelectOption[],
) => {
  return selectOptions.find(option => option.value === value)?.label;
};
