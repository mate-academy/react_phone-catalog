import arrowDown from '../../assets/icons/arrowDown.svg';
import styles from './ProductFilters.module.scss';
import { useLanguage } from '../context/LanguageContext';

type Props = {
  sort: string;
  perPage: string;
  onParamsChange: (name: string, value: string) => void;
};

export const ProductFilters: React.FC<Props> = ({
  sort,
  perPage,
  onParamsChange,
}) => {
  const { t } = useLanguage();

  return (
    <div className={styles.filters}>
      <div className={styles.filter}>
        <p className={styles.filterName}>{t('SortBy')}</p>
        <div className={styles.selectWrapper}>
          <select
            className={styles.select}
            value={sort}
            onChange={e => onParamsChange('sort', e.target.value)}
          >
            <option value="age">{t('Newest')}</option>
            <option value="title">{t('Alphabetically')}</option>
            <option value="price">{t('Cheapest')}</option>
          </select>
          <img src={arrowDown} alt="" className={styles.arrow} />
        </div>
      </div>
      <div className={styles.filter}>
        <p className={styles.filterName}>{t('ItemsOnPage')}</p>
        <div className={styles.selectWrapper}>
          <select
            className={styles.selectPage}
            value={perPage}
            onChange={e => onParamsChange('perPage', e.target.value)}
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="all">{t('all')}</option>
          </select>
          <img src={arrowDown} alt="" className={styles.arrow} />
        </div>
      </div>
    </div>
  );
};
