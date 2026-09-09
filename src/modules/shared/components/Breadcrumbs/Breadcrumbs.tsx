import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import homeIcon from '../../assets/icons/home.svg';
import chevronRight from '../../assets/icons/chevron-right.svg';
import styles from './Breadcrumbs.module.scss';

export type Crumb = {
  text: string;
  // без to — последний элемент, просто текст
  to?: string;
};

type Props = {
  items: Crumb[];
};

export const Breadcrumbs = ({ items }: Props) => (
  <nav className={styles.breadcrumbs} aria-label="Breadcrumbs">
    <Link to="/" className={styles.home} aria-label="Home">
      <img src={homeIcon} alt="" />
    </Link>

    {items.map(item => (
      <Fragment key={item.text}>
        <img src={chevronRight} alt="" className={styles.arrow} />

        {item.to ? (
          <Link to={item.to} className={styles.link}>
            {item.text}
          </Link>
        ) : (
          <span className={styles.current}>{item.text}</span>
        )}
      </Fragment>
    ))}
  </nav>
);
