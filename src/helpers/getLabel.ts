import { SortOption } from './options';

export function getLabel(
  options: SortOption[],
  value: string,
): string | undefined {
  const option = options.find(selection => selection.value === value);

  return option ? option.label : undefined;
}
