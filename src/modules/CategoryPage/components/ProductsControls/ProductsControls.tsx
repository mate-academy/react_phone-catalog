import { Select } from '../../../../components/Select';
import { SortType } from '../../../../types';
import { PER_PAGE_OPTIONS, SORT_OPTIONS } from '../../constants';
import styles from './ProductsControls.module.scss';

interface Props {
  sortType: SortType;
  perPage: string;
  hasPerPageSelect: boolean;
  onSortChange: (value: string) => void;
  onPerPageChange: (value: string) => void;
}

export const ProductsControls = ({
  sortType,
  perPage,
  hasPerPageSelect,
  onSortChange,
  onPerPageChange,
}: Props) => (
  <div className={styles['products-controls']}>
    <div className={styles['products-controls__item']}>
      <Select
        label="Sort by"
        value={sortType}
        options={SORT_OPTIONS}
        onChange={onSortChange}
      />
    </div>

    {hasPerPageSelect && (
      <div className={styles['products-controls__item']}>
        <Select
          label="Items on page"
          value={perPage}
          options={PER_PAGE_OPTIONS.map(value => ({ value, label: value }))}
          onChange={onPerPageChange}
        />
      </div>
    )}
  </div>
);
