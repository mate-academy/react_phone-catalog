import { FC } from 'react';

import { Dropdown } from '@ui/index';

import { useDropdownState } from '@hooks/useDropdownState';

import { SORT_OPTIONS } from '@utils/constants/optionsForSort';
import { createItemsOnPageOptions } from '@utils/helpers/createItemsByOptions';
import { SORT_BY } from '@utils/types/SORT_BY.enum';
import { IPagination } from '@utils/types/pagination.interface';

import styles from './CatalogDropdowns.module.scss';

type TProps = {
  initialPerPage: number;
  productsLength: number;
  pagination: IPagination;
};

export const CatalogDropdowns: FC<TProps> = ({
  initialPerPage,
  pagination,
  productsLength,
}) => {
  const { isDropdownOpen, toggleDropdown, closeDropdown } = useDropdownState();
  const ITEMS_ON_PAGE = createItemsOnPageOptions(productsLength);

  return (
    <div className={styles.dropdowns}>
      <Dropdown
        name={SORT_BY.properties}
        options={SORT_OPTIONS}
        isDropdownOpen={isDropdownOpen.sortByProperties}
        toggleDropdown={() => toggleDropdown(SORT_BY.properties)}
        closeDropdown={() => closeDropdown(SORT_BY.properties)}
        initialPerPage={initialPerPage}
      />
      <Dropdown
        name={SORT_BY.page}
        options={ITEMS_ON_PAGE}
        isDropdownOpen={isDropdownOpen.sortByPage}
        toggleDropdown={() => toggleDropdown(SORT_BY.page)}
        closeDropdown={() => closeDropdown(SORT_BY.page)}
        setItemPerPage={pagination.setItemPerPage}
        setCurrentPage={pagination.setCurrentPage}
        initialPerPage={initialPerPage}
        small
      />
    </div>
  );
};
