// utils/getDropdownParams.ts
import type { SelectOption } from '../types/SelectOption';

type GetDropdownParamsProps = {
  paramKey: string;
  optionValue: string;
  options: SelectOption[];
};

export const getDropdownParams = ({
  paramKey,
  optionValue,
  options,
}: GetDropdownParamsProps) => {
  const params: Record<string, string | null> = {
    [paramKey]: optionValue === options[0].value ? null : optionValue,
  };

  if (paramKey === 'perPage' && optionValue === 'all') {
    params.page = null;
  }

  if (paramKey === 'perPage' && optionValue !== 'all') {
    params.page = '1';
  }

  if (paramKey === 'sort') {
    params.page = '1';
  }

  return params;
};
