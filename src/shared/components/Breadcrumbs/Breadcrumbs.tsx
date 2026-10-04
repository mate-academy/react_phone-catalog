import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import { Category } from '@/shared/types/Category';
import { GoBack } from '../GoBack';
import { useTheme } from '@/shared/context/FavoriteContext/useTheme';
import { useTranslation } from 'react-i18next';

type Props = {
  title: string;
  productName?: string;
  category?: Category;
};

export const Breadcrumbs: React.FC<Props> = ({
  title,
  productName,
  category,
}) => {
  const { theme } = useTheme();

  const { t } = useTranslation();

  return (
    <div className={styles.breadcrumbs}>
      <div className={styles.top}>
        <Link className={styles.home} to="/">
          <img
            src={theme === 'light' ? 'icons/home.svg' : 'icons/home-white.svg'}
            alt="Home"
          />
        </Link>
        <img src="icons/right.svg" alt="" />
        {productName ? (
          <Link to={`/${category}`}>
            <span className={styles.link}>{t(title)}</span>
          </Link>
        ) : (
          <span className={styles.page}>{t(title)}</span>
        )}
        {productName && (
          <>
            <img src="icons/right.svg" alt="" />
            <span className={`${styles.page} ${styles.productName}`}>
              {productName}
            </span>
          </>
        )}
      </div>

      {productName && <GoBack category={category} />}
    </div>
  );
};
