import { PaginationCrumbs as Crumbs } from './PaginationCrumbs';
import { Pagination as PaginationContainer } from './Pagination';
import { PaginationNextButton as NextButton } from './PaginationNextButton';
import { PaginationPrevButton as PrevButton } from './PaginationPrevButton';

export const Pagination = Object.assign(PaginationContainer, {
  Crumbs,
  NextButton,
  PrevButton,
});
