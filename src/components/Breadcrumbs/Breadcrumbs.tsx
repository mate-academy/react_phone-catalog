/* eslint-disable max-len */
import styles from './Breadcrumbs.module.scss';
import { Link, NavLink, useLocation, useParams } from 'react-router-dom';
import React, { Fragment, useMemo } from 'react';
import classNames from 'classnames';
import { Product } from '../../types/Product';
import { ProductType } from '../../types/ProductType';
import { useTranslation } from 'react-i18next';

interface Props {
  productList: Product[];
}

export const Breadcrumbs: React.FC<Props> = ({ productList }) => {
  const { t } = useTranslation('common');
  const { pathname } = useLocation();
  const { productId } = useParams();

  const productExist = useMemo(() => {
    return productId ? productList.some(({ id }) => id === productId) : true;
  }, [productId, productList]);

  const breadcrumbs = useMemo(() => {
    let currentLink = '';

    return pathname
      .split('/')
      .filter(location => !!location)
      .map(crumb => {
        currentLink += '/' + crumb;
        const productName = productList.find(
          product => product.id === crumb,
        )?.name;

        const locationName =
          productName || crumb.slice(0, 1).toUpperCase() + crumb.slice(1);

        return [currentLink, locationName];
      });
  }, [pathname, productList]);

  return (
    <div
      className={classNames(styles.pathWrapper, {
        [styles.pathWrapperNoProduct]: !productExist,
      })}
    >
      <div className={styles.pathContainer}>
        <Link
          to="/"
          className={styles.toHome}
          aria-label={t('accessibility.goToHomepage')}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7.59087 0.807088C7.83161 0.619846 8.16872 0.619846 8.40946 0.807088L14.4095 5.47375C14.5718 5.60006 14.6668 5.79426 14.6668 5.99999V13.3333C14.6668 13.8638 14.4561 14.3725 14.081 14.7475C13.706 15.1226 13.1973 15.3333 12.6668 15.3333H3.3335C2.80306 15.3333 2.29436 15.1226 1.91928 14.7475C1.54421 14.3725 1.3335 13.8638 1.3335 13.3333V5.99999C1.3335 5.79426 1.42848 5.60006 1.59087 5.47375L7.59087 0.807088ZM2.66683 6.32605V13.3333C2.66683 13.5101 2.73707 13.6797 2.86209 13.8047C2.98712 13.9298 3.15669 14 3.3335 14H12.6668C12.8436 14 13.0132 13.9298 13.1382 13.8047C13.2633 13.6797 13.3335 13.5101 13.3335 13.3333V6.32605L8.00016 2.1779L2.66683 6.32605Z" />
            <path d="M5.3335 8.00001C5.3335 7.63182 5.63197 7.33334 6.00016 7.33334H10.0002C10.3684 7.33334 10.6668 7.63182 10.6668 8.00001V14.6667C10.6668 15.0349 10.3684 15.3333 10.0002 15.3333C9.63197 15.3333 9.3335 15.0349 9.3335 14.6667V8.66668H6.66683V14.6667C6.66683 15.0349 6.36835 15.3333 6.00016 15.3333C5.63197 15.3333 5.3335 15.0349 5.3335 14.6667V8.00001Z" />
          </svg>
        </Link>
        {breadcrumbs.map(([location, locationName], index) => {
          const path = Object.keys(ProductType).includes(
            locationName.toLowerCase(),
          )
            ? t(`productCategory.${locationName.toLowerCase()}`)
            : locationName === 'Favorites'
              ? t(`favorites`)
              : locationName;

          return (
            <Fragment key={location}>
              <span className={styles.arrowRight}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5.52876 3.52861C5.78911 3.26826 6.21122 3.26826 6.47157 3.52861L10.4716 7.52861C10.7319 7.78896 10.7319 8.21107 10.4716 8.47141L6.47157 12.4714C6.21122 12.7318 5.78911 12.7318 5.52876 12.4714C5.26841 12.2111 5.26841 11.789 5.52876 11.5286L9.05735 8.00001L5.52876 4.47141C5.26841 4.21107 5.26841 3.78896 5.52876 3.52861Z" />
                </svg>
              </span>
              <NavLink
                to={`${location}`}
                className={classNames(styles.currPlace, {
                  [styles.currPlaceIsDisabled]:
                    index === breadcrumbs.length - 1,
                })}
              >
                {path}
              </NavLink>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};
