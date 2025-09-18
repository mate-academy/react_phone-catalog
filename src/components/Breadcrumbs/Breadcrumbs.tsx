import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import { Item } from '../../types/Item';
import { useTheme } from '../../contexts/ThemeContext';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslation } from 'react-i18next';

type Props = {
  category: string;
  product: Item | undefined;
};

export const Breadcrumbs: React.FC<Props> = ({ category, product }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const translatedCategory =
    category === 'accessories'
      ? t('nav.accessories')
      : category === 'phones'
        ? t('nav.phones')
        : t('nav.tablets');

  return (
    <div className={styles.breadcrumbs}>
      <Link
        to="#"
        className={`${styles.breadcrumbs__linkHome} ${theme === 'light' && styles['breadcrumbs__linkHome--lightTheme']}`}
      ></Link>
      <div
        className={`${styles.breadcrumbs__arrowRight} ${theme === 'light' && styles['breadcrumbs__arrowRight--lightTheme']}`}
      ></div>

      <Link className={styles.breadcrumbs__category} to={`/${category}`}>
        {translatedCategory}
      </Link>

      <div
        className={`${styles.breadcrumbs__arrowRight} ${theme === 'light' && styles['breadcrumbs__arrowRight--lightTheme']}`}
      ></div>
      <p className={styles.breadcrumbs__currentLink}>{product?.name}</p>
    </div>
  );
};
