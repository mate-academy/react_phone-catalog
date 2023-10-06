import { Option } from '../types/Option';

export const findValue = (arrays: Option[], value: string) => {
  return arrays.find(option => option.value === value)?.name
    || arrays[0].name;
};
