import { useSearchParams } from 'react-router-dom';
import { DEFAULT_SORT_QUERY, sortOptions } from '../../constants/sort';
import { DropdownMenu } from '../DropdownMenu/DropdownMenu';

import { capatalize } from '../../utils';

import {
  DEFAULT_PER_PAGE,
  paginationOptions,
} from '../../constants/pagination';
import styles from './SortAndPaginationMenu.module.scss';

export const SortAndPaginationMenu: React.FC = () => {
  const [searchParams] = useSearchParams();

  const sortQuery = searchParams.get('sort');
  const perPage = searchParams.get('perPage');

  return (
    <div className={styles.DropdownsMenuWrapper}>
      <div className={styles.DropdownsMenu}>
        <p className={styles.Title}>Sort by</p>
        <DropdownMenu
          defaultParams={capatalize(DEFAULT_SORT_QUERY)}
          items={sortOptions}
          params={sortQuery}
        />
      </div>
      <div className={styles.DropdownsMenu}>
        <p className={styles.Title}>Items on page</p>
        <DropdownMenu
          defaultParams={DEFAULT_PER_PAGE}
          items={paginationOptions}
          size="Small"
          params={perPage}
        />
      </div>
    </div>
  );
};
