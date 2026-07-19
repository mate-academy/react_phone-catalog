import { Link } from 'react-router-dom';

import styles from './Breadcrumbs.module.scss';

type CategoryLink = {
  title: string;
  to: string;
};

type Props = {
  currentPage: string;
  category?: CategoryLink;
};

const iconSrc = (iconName: string) => {
  return `${import.meta.env.BASE_URL}img/icons/${iconName}`;
};

export const Breadcrumbs = ({ currentPage, category }: Props) => {
  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumbs">
      <Link to="/" className={styles.homeLink} aria-label="Home">
        <img src={iconSrc('home.svg')} alt="" className={styles.homeIcon} />
      </Link>

      <img
        src={iconSrc('chevron-right.svg')}
        alt=""
        className={styles.separatorIcon}
      />

      {category && (
        <>
          <Link to={category.to} className={styles.categoryLink}>
            {category.title}
          </Link>

          <img
            src={iconSrc('chevron-right.svg')}
            alt=""
            className={styles.separatorIcon}
          />
        </>
      )}

      <span className={styles.current} title={currentPage}>
        {currentPage}
      </span>
    </nav>
  );
};
