import { Link } from 'react-router-dom';

import styles from './Breadcrumbs.module.scss';

type Props = {
  currentPage: string;
};

const iconSrc = (iconName: string) =>
  `${import.meta.env.BASE_URL}img/icons/${iconName}`;

export const Breadcrumbs = ({ currentPage }: Props) => {
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

      <span className={styles.current}>{currentPage}</span>
    </nav>
  );
};
