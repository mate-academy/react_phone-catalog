import { useTranslation } from 'react-i18next';
import styles from './NoResults.module.scss';
import searchX from './image/search-x.svg';

interface Props {
  category?: string;
}

export const NoResults = ({ category = 'products' }: Props) => {
  const { t } = useTranslation();

  const getCategoryKey = (cat: string) => {
    if (cat === 'phones') return t('nav.phones').toLowerCase();
    if (cat === 'tablets') return t('nav.tablets').toLowerCase();
    if (cat === 'accessories') return t('nav.accessories').toLowerCase();
    return t('catalog.products');
  };

  return (
    <div className={styles.wrapper}>
      <img
        src={searchX}
        alt="No results found"
        className={styles.icon}
      />
      <h2 className={styles.title}>
        {t('catalog.no_found', { category: getCategoryKey(category) })}
      </h2>
      <p className={styles.message}>{t('catalog.no_results_message')}</p>
    </div>
  );
};
