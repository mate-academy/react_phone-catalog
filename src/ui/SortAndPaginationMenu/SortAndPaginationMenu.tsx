import { useSearchParams } from 'react-router-dom';
import {
  DEFAULT_PER_PAGE,
  valuesPagination,
  valuesSorts,
} from '../../constants/default-values';
import { DropdownMenu } from '../DropdownMenu/DropdownMenu';

import { Sorts } from '../../types/Sorts';
import { capatalize } from '../../utils';

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
          defaultParams={capatalize(Sorts.newest)}
          items={valuesSorts}
          params={sortQuery}
        />
      </div>
      <div className={styles.DropdownsMenu}>
        <p className={styles.Title}>Items on page</p>
        <DropdownMenu
          defaultParams={DEFAULT_PER_PAGE}
          items={valuesPagination}
          isPrimary={true}
          params={perPage}
        />
      </div>
    </div>
  );
};
