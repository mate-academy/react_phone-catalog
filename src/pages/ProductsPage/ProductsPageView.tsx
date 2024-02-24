import { memo } from 'react';
import { DropDown } from '../../components/DropDown';
import { Catalogue } from '../../components/Catalogue';
import { Pagination } from '../../components/Pagination';
import { ITEMS_PER_PAGE, SORT_BY_OPTIONS } from '../../constants/constants';
import { PhonesPageViewProps } from './types';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import './PhonesPage.scss';

export const PhonesPageView = memo<PhonesPageViewProps>(({
  totalItems,
  itemsOnPage,
  changeItemsPerPage,
  currentItems,
  currentPage,
  setCurrentPage,
  sortItems,
}) => {
  return (
    <div className="phones-page">
      <Breadcrumbs />
      <div className="phones-page__controls">
        <DropDown
          title="Sort by"
          defaultSelectedOption={SORT_BY_OPTIONS[0]}
          selectOptions={SORT_BY_OPTIONS}
          onSubmit={sortItems}

        />
        <DropDown
          title="Items on page"
          defaultSelectedOption={`${itemsOnPage}`}
          selectOptions={ITEMS_PER_PAGE}
          onSubmit={changeItemsPerPage}
        />
      </div>

      <div className="phones-page-container">
        {currentItems && (
          <Catalogue
            items={currentItems}
          />
        )}
      </div>
      <div className="phones-page-pagination">
        <Pagination
          itemsPerPage={itemsOnPage}
          totalItems={totalItems}
          currentPage={currentPage}
          onClick={setCurrentPage}
        />
      </div>
    </div>
  );
});
