import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './breadcrumbs.module.scss';
import classNames from 'classnames';
import { BackButton } from '../buttonback/back';

export const BreadCrumbs: React.FC = ({
  isLocationItemCard,
  productId,
  map,
}) => {
  const breadCrumbs = isLocationItemCard ? (
    <p className={styles.breadcrumbs__text}>{map}</p>
  ) : (
    <p></p>
  );
  const backPage = useNavigate();

  const handleClick = () => backPage(-1);

  return (
    <div className={styles.breadcrumbs}>
      <div className={styles.breadcrumbs__container}>
        <NavLink className={styles['breadcrumbs__link-home']} to={'/'}>
          <img
            className={styles['breadcrumbs__home-image']}
            src="/img/Home.png"
            alt=""
          />
        </NavLink>
        <img
          className={styles['breadcrumbs__arrow-image']}
          src="/img/arrow.png"
          alt=""
        />
        <NavLink
          className={classNames(styles['breadcrumbs__link-page'], {
            [styles['breadcrumbs__link-page--active']]:
              isLocationItemCard && productId,
          })}
          to={`/${map}`}
        >
          {breadCrumbs}
        </NavLink>
        {isLocationItemCard && productId && (
          <>
            <img
              className={styles['breadcrumbs__arrow-image']}
              src="/img/arrow.png"
              alt=""
            />
            <p className={styles['breadcrumbs__product-name']}>{productId}</p>
          </>
        )}
      </div>
      {productId && (
        <>
          <img
            className={styles['breadcrumbs__arrow-back']}
            src="/img/arrow.png"
            alt=""
          />
          <BackButton onBack={handleClick} />
        </>
      )}
    </div>
  );
};
