import { PerPage, SortFields } from '../../enums';

export type SearchParamsType = {
  query?: string | null;
  sort?: SortFields | null;
  perPage?: PerPage | null;
  page?: string | null;
};
