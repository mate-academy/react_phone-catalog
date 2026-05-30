export const itemsMappingOptionsToQueryParamValue = {
  '32': '32',
  '16': '16',
  '8': '8',
  '4': '4',
} as const;

export const sortMappingOptionsToQueryParamValue = {
  age: "Newest",
  title: "Alphabetically",
  price: "Cheapest",
} as const;

export type ItemsOptions = typeof itemsMappingOptionsToQueryParamValue;
export type SortOptions = typeof sortMappingOptionsToQueryParamValue;
