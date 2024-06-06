import { SelectOption } from '../types';

export const convertSelectDataToSelectOptions = (
  data: Record<string, string>,
): SelectOption[] =>
  Object.entries(data).map(([value, label]) => ({ value, label }));
