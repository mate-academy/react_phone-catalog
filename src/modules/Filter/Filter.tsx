// import { useEffect, useState } from 'react';

import { TABLET_SIZE } from '../../consts/consts';
import { useWindowDimensions } from '../../hooks/hooks';
import { PerPage } from '../../utils/enums/perPage';
import { SortBy } from '../../utils/enums/sortBy';
import { SortVariants } from '../../utils/enums/sortVariants';
import { DropDown } from './DropDown/DropDown';
import styles from './Filter.module.scss';
import { Search } from './Search';

export const Filter = () => {
  const SORT_BY: SortBy[] = [
    SortBy.Newest,
    SortBy.Alphabetically,
    SortBy.Cheapest,
  ];
  const PER_PAGE: PerPage[] = [
    PerPage.Four,
    PerPage.Eight,
    PerPage.Sixteen,
    PerPage.All,
  ];
  const { width } = useWindowDimensions();

  return (
    <div className={styles.filter}>
      <div className={styles.filter__wrapper}>
        <DropDown
          sortFields={SORT_BY}
          queryParams={SortVariants.sortBy}
          label={'Sort by'}
        />
        <DropDown
          sortFields={PER_PAGE}
          queryParams={SortVariants.perPage}
          label={'Items on page'}
        />
      </div>
      {width < TABLET_SIZE && (
        <Search queryParams={SortVariants.query} label={'Search'} />
      )}
    </div>
  );
};
