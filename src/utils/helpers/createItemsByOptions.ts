import { TOptions } from '@utils/constants/optionsForSort';

export const createItemsOnPageOptions = (totalProducts: number): TOptions[] => {
  const options: TOptions[] = [];

  if (totalProducts > 0) {
    options.push({ value: totalProducts, label: 'All' });
  }

  const predefinedOptions = [64, 32, 16, 8, 4];

  predefinedOptions.forEach(option => {
    if (option <= totalProducts) {
      options.push({ value: option, label: option.toString() });
    }
  });

  return options;
};
