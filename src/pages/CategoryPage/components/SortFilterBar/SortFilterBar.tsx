import React, { useMemo } from 'react';
import CustomSelect2 from '../../../../components/CustomSelect2/CustomSelect2';
import styles from './SortFilterBar.module.scss';
import classNames from 'classnames';
import useLanguageStore from '../../../../stores/useLanguageStore';

interface SortFilterBarProps {
  currentSortBy: string;
  setSortBy: (sortBy: string) => void;
  currentPerPage: string;
  setPerPage: (perPage: string) => void;
}

const SortFilterBar: React.FC<SortFilterBarProps> = ({
  currentSortBy,
  setSortBy,
  currentPerPage,
  setPerPage,
}) => {
  const { t, currentLanguage } = useLanguageStore();

  const translatedSortOptions = useMemo(() => {
    return [
      { value: 'newest', label: t('sort_newest') },
      { value: 'alphabetically', label: t('sort_alphabetically') },
      { value: 'cheapest', label: t('sort_cheapest') },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, currentLanguage]);

  const translatedItemsPerPageOptions = useMemo(() => {
    return [
      { value: '4', label: '4' },
      { value: '8', label: '8' },
      { value: '16', label: '16' },
      { value: 'all', label: t('sort_all') },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, currentLanguage]);

  return (
    <div className={styles['sort-filter-bar']}>
      <div
        className={classNames(
          styles['sort-filter-bar__item'],
          styles['sort-filter-bar__sort-by'],
        )}
      >
        <CustomSelect2
          options={translatedSortOptions}
          currentValue={currentSortBy}
          description={t('sort_by')}
          onChange={setSortBy}
        />
      </div>

      <div
        className={classNames(
          styles['sort-filter-bar__item'],
          styles['sort-filter-bar__page'],
        )}
      >
        <CustomSelect2
          options={translatedItemsPerPageOptions}
          currentValue={currentPerPage}
          description={t('sort_items_per_page')}
          onChange={setPerPage}
        />
      </div>
    </div>
  );
};

export default SortFilterBar;
