export type SortKey = 'age' | 'title' | 'price';

export const SORT_OPTIONS_MAP = {
  age: 'Newest',
  title: 'Alphabetically',
  price: 'Cheapest',
} as const;

export type SortOption = (typeof SORT_OPTIONS_MAP)[SortKey];

// Type-safe object for sort options
export const SORT_OPTIONS_OBJ = {
  options: SORT_OPTIONS_MAP,
};

// Type-safe array of sort option values
export const SORT_OPTIONS_VALUES: SortOption[] =
  Object.values(SORT_OPTIONS_MAP);

// Type-safe array of sort keys
export const SORT_KEYS: SortKey[] = Object.keys(SORT_OPTIONS_MAP) as SortKey[];

// Utility type to create a mapping between SortKey and SortOption
export type SortKeyOptionMap = {
  [K in SortKey]: SortOption;
};

// Type-safe mapping between keys and options
export const SORT_KEY_OPTION_MAP: SortKeyOptionMap = SORT_OPTIONS_MAP;
console.log(SORT_KEY_OPTION_MAP);

// Function to get SortKey from SortOption
export function getSortKeyFromOption(option: SortOption): SortKey | undefined {
  return Object.entries(SORT_KEY_OPTION_MAP).find(
    ([, value]) => value === option,
  )?.[0] as SortKey | undefined;
}

// Function to get SortOption from SortKey
export function getSortOptionFromKey(key: SortKey): SortOption {
  return SORT_KEY_OPTION_MAP[key];
}

export interface DropDownSort {
  name: 'Sort by';
  urlSearchName: 'sort';
  values: SortOption[];
}
