import { useTranslation } from 'react-i18next';
import { itemCountOption } from '../../constants/itemCountOption';
import { sortOption } from '../../constants/sortOprion';
import { SearchDropdown } from '../SearchDropdown';
import styles from './SortsWidget.module.scss';
import { SearchInput } from '../SearchInput/SearchInput';

export const SortsWidget = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.sorts}>
        <SearchDropdown
          options={sortOption}
          initialOption={sortOption[0]}
          width={180}
          ladel={t('catalog_pages.sort_by_dropdown.label')}
          searchKey="sort"
        />

        <SearchDropdown
          options={itemCountOption}
          initialOption={itemCountOption[0]}
          width={128}
          ladel={t('catalog_pages.item_on_page_label')}
          searchKey="perPage"
        />
      </div>

      <SearchInput />
    </>
  );
};
