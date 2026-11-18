import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import { useTheme } from '../../context/ThemeContext';
import { getPublicUrl } from '../../utils/getPublicUrl';

type Props = {
  currentPage: string;
  category?: string;
  categoryLink?: string;
};

export const Breadcrumbs = ({ currentPage, category, categoryLink }: Props) => {
  const { theme } = useTheme();

  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <Link className={styles.homeLink} to="/">
        <img
          className={styles.homeIcon}
          src={getPublicUrl(
            theme === 'dark' ? '/img/icon/home-dark.svg' : '/img/icon/home.svg',
          )}
          alt="Home"
        />
      </Link>

      <img
        className={styles.breadcrumbChevron}
        src={getPublicUrl('/img/icon/breadcrumb-chevron.svg')}
        alt=""
      />

      {category && categoryLink && (
        <>
          <Link className={styles.categoryLink} to={categoryLink}>
            {category}
          </Link>

          <img
            className={styles.breadcrumbChevron}
            src={getPublicUrl('/img/icon/breadcrumb-chevron.svg')}
            alt=""
          />
        </>
      )}

      <span className={styles.breadcrumbCurrent}>{currentPage}</span>
    </nav>
  );
};
