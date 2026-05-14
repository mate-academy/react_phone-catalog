import { PerPageType, SortType } from '../types/Types';

export const SORT_OPTIONS = [
  { label: 'Newest', value: SortType.AGE },
  { label: 'Alphabetically', value: SortType.TITLE },
  { label: 'Cheapest', value: SortType.PRICE },
];

export const PER_PAGE_OPTIONS = [
  { label: '4', value: PerPageType.FOUR },
  { label: '8', value: PerPageType.EIGHT },
  { label: '16', value: PerPageType.SIXTEEN },
  { label: 'All', value: PerPageType.ALL },
];

export const GIT_HUB_REPO =
  'https://github.com/maximtsyrulnyk/react_phone-catalog';

export const CONTACTS_ORIGIN_REPO =
  'https://github.com/maximtsyrulnyk/react_phone-catalog';

export const RIGHTS_PATH =
  'https://github.com/maximtsyrulnyk/react_phone-catalog';
