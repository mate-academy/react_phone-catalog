import { SortBy, SORT_BY } from './SortSelect';

/**
 * Checks if the value is a valid sort by option.
 *
 * @export
 * @param {(string | null)} value
 * @return {*}  {value is SortBy}
 */
export function isSortBy(value: string | null): value is SortBy {
  return (
    value === SORT_BY.AGE || value === SORT_BY.TITLE || value === SORT_BY.PRICE
  );
}
