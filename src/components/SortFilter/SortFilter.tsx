import classNames from 'classnames';
import style from './SortFilter.module.scss';
import { Selector } from './Selector';
import { SearchParams } from '../../types/SearchParams';
import { SortingTypes } from '../../types/SortFilter';

const perPage = ['4', '8', '16', 'All'];
const sorting = Object.values(SortingTypes);

export const SortFilter = () => {
  return (
    <div className={classNames(style.search_filter_container)}>
      <div className={classNames(style.container_item, style.container_sort)}>
        <p className={classNames(style.container_title)}>Sort by</p>
        <Selector
          searchParamName={SearchParams.order}
          options={sorting}
        />
      </div>

      <div
        className={classNames(style.container_item, style.container_perPage)}
      >
        <p className={classNames(style.container_title)}>Items on page</p>
        <Selector
          searchParamName={SearchParams.perPage}
          options={perPage}
          defaultValue={perPage.length - 1}
        />
      </div>
    </div>
  );
};
