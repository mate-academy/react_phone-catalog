import { SelectOption } from '../types';
import { useSingleSearchParam } from './useSingleSearchParam';

const isValidOption = (value: unknown): value is SelectOption => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'value' in value &&
    'label' in value
  );
};

export const useSearchParamsSelect = (
  key: string,
  options: SelectOption[],
  defaultValue: SelectOption = options[0],
) => {
  const [param, setParam] = useSingleSearchParam(key);
  const value =
    options.find(option => {
      return option.value === param;
    }) ?? defaultValue;

  const onChange = (newValue: unknown) => {
    if (!isValidOption(newValue)) {
      return;
    }

    setParam(newValue.value);
  };

  return [value, onChange] as const;
};
