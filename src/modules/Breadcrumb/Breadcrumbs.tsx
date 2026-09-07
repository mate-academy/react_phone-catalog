/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames';
import React, { useContext, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { ProductsContext } from '../../context/ProductsContext';
import styles from './Breadcrumbs.module.scss';
import { Arrow } from './components/Arrow';
import { HomeIcon } from './components/HomeIcon';

export const Breadcrumbs: React.FC = () => {
  const { pathname } = useLocation();
  const { products } = useContext(ProductsContext);
  const navigate = useNavigate();
  const pathArr = pathname.split('/').splice(1);
  const product = products.find(_product => _product.itemId === pathArr[1]);

  // #region segments

  const segments = useMemo(() => {
    const resultingArray = [];
    const firstSegment = pathArr[0][0].toUpperCase() + pathArr[0].slice(1);

    if (pathArr.length > 0) {
      resultingArray.push(firstSegment);
    }

    if (product && pathArr.length > 1) {
      const { name } = product;

      resultingArray.push(name);
    }

    return resultingArray;
  }, [pathArr]);

  // #endregion

  const onClickHandler = () => {
    navigate(`/${pathArr[0]}`);
  };

  return (
    <div className={styles.breadcrumbs}>
      <Link to="/home" className={styles['home-icon']}>
        <HomeIcon />
      </Link>
      {segments.map((breadcrumb, index) => {
        const titleValue = index === 1 ? product?.name : '';
        const onClickValue = index === 0 ? onClickHandler : () => {};

        return (
          <React.Fragment key={breadcrumb}>
            <div className={styles.arrow}>
              <Arrow />
            </div>
            <div
              className={classNames(styles.link, {
                [styles['is-active']]: pathname === `/${pathArr[0]}`,
                [styles['phone-link']]: index === 1,
              })}
              onClick={onClickValue}
              title={titleValue}
            >
              {breadcrumb}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};
