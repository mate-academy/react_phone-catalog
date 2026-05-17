import { Breadcrumbs } from '../../shared/ui/Breadcrumbs';
import style from './TopPageBlock.module.scss';
import { Select } from '../../shared/ui/Select';
import { SelectOptions } from '../../types/selectType';
import { useFilters } from '../../store/FiltersContext';
import {
  paginationOptions,
  sortBy,
} from '../../shared/ui/Select/data/selectData';
import { usePaginate } from '../../store/PaginationContext';
import { useContext } from 'react';
import { ProductContext } from '../../store/ProductContext';
import { SkeletonTitle } from '../../shared/ui/Skeletons/SkeletonTitle';

type TopPageBlockProps = {
  title: string;
};

export const TopPageBlock: React.FC<TopPageBlockProps> = ({ title }) => {
  const filters = useFilters();
  const paginate = usePaginate();
  const { loading } = useContext(ProductContext);

  return (
    <div className={style.topBlock}>
      <Breadcrumbs />

      <h1 className={style.title}>{title}</h1>
      {loading ? (
        <SkeletonTitle />
      ) : (
        <span className={style.itemsQuantity}>
          {filters.productCard.length} models
        </span>
      )}

      <div className={style.dropdowns}>
        <div className={style.sortBy}>
          <span className={style.selectTitle}>SortBy</span>
          <Select
            options={sortBy}
            value={filters.value}
            onChange={(option: SelectOptions | undefined) => {
              if (option) {
                filters.handleSelectChange(option);
              }
            }}
          />
        </div>

        <div className={style.itemsOn}>
          <span className={style.selectTitle}>Items on page</span>
          <Select
            options={paginationOptions}
            value={paginate.itemsPerPage}
            onChange={(option: SelectOptions | undefined) => {
              if (option) {
                paginate.handlePaginationChange(option);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
