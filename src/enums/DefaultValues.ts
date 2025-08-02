import { ItemPerPage } from './ItemsPerPage';
import { SortBy } from './SortBy';

export enum DefaultValues {
  Sort = SortBy.Newest,
  PerPage = ItemPerPage.Eight,
  Page = '1',
  Query = '',
}
