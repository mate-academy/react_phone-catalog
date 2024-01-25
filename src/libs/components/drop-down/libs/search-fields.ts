import { PerPage, SearchParams, SortFields } from '../../../enums';

type SortOption = {
  name: string;
  value: SortFields;
};

type PerPageOption = {
  name: string;
  value: PerPage;
};

type SearchFieldsType = {
  [SearchParams.SORT]: SortOption[];
  [SearchParams.PER_PAGE]: PerPageOption[];
};

export const searchFields: SearchFieldsType = {
  [SearchParams.SORT]: [
    {
      name: 'Default',
      value: SortFields.Default,
    },
    {
      name: 'Newest',
      value: SortFields.Newest,
    },
    {
      name: 'Alphabetically',
      value: SortFields.Alphabetically,
    },
    {
      name: 'Cheapest',
      value: SortFields.Cheapest,
    },
  ],
  [SearchParams.PER_PAGE]: [
    {
      name: '16',
      value: PerPage.Sixteen,
    },
    {
      name: '8',
      value: PerPage.Eight,
    },
    {
      name: '4',
      value: PerPage.Four,
    },
    {
      name: 'All',
      value: PerPage.All,
    },
  ],
};
