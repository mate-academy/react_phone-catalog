import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

type Props = {
  pathname: string;
  productName?: string;
};

export const Breadcrumbs: React.FC<Props> = ({ pathname, productName }) => {
  const firstSegment = pathname.split('/')[1];
  const breadcrumbsTitle =
    firstSegment.charAt(0).toUpperCase() + firstSegment.slice(1);

  // eslint-disable-next-line no-console
  console.log('firstSegment:', firstSegment);

  return (
    <div className={styles.breadcrumbs}>
      <NavLink to="/" className={styles.button}>
        <img src={`img/icons/home.svg`} alt="Home" className={styles.img} />
      </NavLink>
      <img src={`img/icons/arrowRight.svg`} alt="arrow right" />
      {!productName ? (
        <p className={styles.sectionTitle}>{breadcrumbsTitle}</p>
      ) : (
        <NavLink to={`/${firstSegment}`} className={styles.link}>
          <p className={styles.sectionTitleActive}>{breadcrumbsTitle}</p>
        </NavLink>
      )}
      <img src={`img/icons/arrowRight.svg`} alt="arrow right" />

      {productName && <p className={styles.productName}>{productName}</p>}
    </div>
  );
};
