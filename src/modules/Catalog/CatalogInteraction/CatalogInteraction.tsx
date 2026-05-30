import { useSearchParams } from 'react-router-dom';
import styles from './CatalogInteraction.module.scss';
import { SearchField } from './SearchField';
import { SelectionField } from './SelectionField';
import { useLanguage } from '../../../contexts/LanguageContext';

export const CatalogInteraction = () => {
  const [, setSearchParams] = useSearchParams();
  const { t } = useLanguage();

  const handleSortType = (value: string) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);

      next.set('sort', value);

      return next;
    });
  };

  const handleTabsNumber = (value: string) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);

      next.set('tabs', value);

      return next;
    });
  };

  return (
    <div className={styles.catalogNavigation__Container}>
      <div className={styles.catalogNavigation__SelectionFields}>
        <div className={styles.catalogNavigation__Sort}>
          <label htmlFor="sortType" className={styles.catalogNavigation__Label}>
            {t('catalog.sortBy')}
          </label>
          <SelectionField
            selectionType={'deviceAge'}
            onChange={handleSortType}
          />
        </div>
        <div className={styles.catalogNavigation__ItemsNumber}>
          <label
            htmlFor="itemsNumber"
            className={styles.catalogNavigation__Label}
          >
            {t('catalog.itemsOnPage')}
          </label>
          <SelectionField
            selectionType={'itemsNumber'}
            onChange={handleTabsNumber}
          />
        </div>
      </div>
      <div className={styles.catalogNavigation__SearchField}>
        <SearchField />
      </div>
    </div>
  );
};
