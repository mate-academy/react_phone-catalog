import React from 'react';
import { DropDowns } from '../DropDowns/DropDowns';
import styles from './PageTop.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';

type Props = {
  title?: string;
  pageName?: string;
  productsLength?: number;
  productInfo?: boolean;
  dropdowns?: boolean;
  itemName?: string;
};

export const PageTop: React.FC<Props> = ({
  title,
  pageName,
  productsLength,
  productInfo,
  dropdowns,
  itemName,
}) => {
  const location = useLocation();
  const from = location.state?.from || '/home';
  const navigate = useNavigate();

  const getBreadcrumbs = (fromLocation: string) => {
    if (fromLocation === '/phones') {
      return 'Phones';
    }

    if (fromLocation === '/tablets') {
      return 'Tablets';
    }

    if (fromLocation === '/accessories') {
      return 'Accessories';
    }

    return null;
  };

  const breadcrumb = getBreadcrumbs(from);

  return (
    <div className={styles.pagetop}>
      <div className={styles.pagetop__info}>
        <Link to="/home" className={styles.pagetop__home}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.59038 0.807088C7.83112 0.619846 8.16823 0.619846
              8.40897 0.807088L14.409 5.47375C14.5714 5.60006 14.6663
              5.79426 14.6663 5.99999V13.3333C14.6663 13.8638 14.4556
              14.3725 14.0806 14.7475C13.7055 15.1226 13.1968 15.3333
              12.6663 15.3333H3.33301C2.80257 15.3333 2.29387 15.1226
              1.91879 14.7475C1.54372 14.3725 1.33301 13.8638 1.33301
              13.3333V5.99999C1.33301 5.79426 1.42799 5.60006 1.59038
              5.47375L7.59038 0.807088ZM2.66634 6.32605V13.3333C2.66634
              13.5101 2.73658 13.6797 2.8616 13.8047C2.98663 13.9298
              3.1562 14 3.33301 14H12.6663C12.8432 14 13.0127 13.9298
              13.1377 13.8047C13.2628 13.6797 13.333 13.5101 13.333
              13.3333V6.32605L7.99967 2.1779L2.66634 6.32605Z"
              fill="#0F0F11"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.33301 8.00001C5.33301 7.63182 5.63148 7.33334
              5.99967 7.33334H9.99967C10.3679 7.33334 10.6663 7.63182
              10.6663 8.00001V14.6667C10.6663 15.0349 10.3679 15.3333
              9.99967 15.3333C9.63148 15.3333 9.33301 15.0349 9.33301
              14.6667V8.66668H6.66634V14.6667C6.66634 15.0349 6.36786
              15.3333 5.99967 15.3333C5.63148 15.3333 5.33301 15.0349
              5.33301 14.6667V8.00001Z"
              fill="#0F0F11"
            />
          </svg>
        </Link>
        {pageName && (
          <svg width="16" height="10" viewBox="0 0 6 10" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.528758 0.528606C0.789108 0.268256 1.21122
              0.268256 1.47157 0.528606L5.47157 4.52861C5.73192
              4.78896 5.73192 5.21107 5.47157 5.47141L1.47157
              9.47141C1.21122 9.73176 0.789108 9.73176 0.528758
              9.47141C0.268409 9.21107 0.268409 8.78896 0.528758
              8.52861L4.05735 5.00001L0.528758 1.47141C0.268409
              1.21107 0.268409 0.788955 0.528758 0.528606Z"
              fill="#B4BDC4"
            />
          </svg>
        )}
        <span className={styles.pagetop__name}>{pageName}</span>
        {breadcrumb && (
          <svg width="16" height="10" viewBox="0 0 6 10" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.528758 0.528606C0.789108 0.268256 1.21122
              0.268256 1.47157 0.528606L5.47157 4.52861C5.73192
              4.78896 5.73192 5.21107 5.47157 5.47141L1.47157
              9.47141C1.21122 9.73176 0.789108 9.73176 0.528758
              9.47141C0.268409 9.21107 0.268409 8.78896 0.528758
              8.52861L4.05735 5.00001L0.528758 1.47141C0.268409
              1.21107 0.268409 0.788955 0.528758 0.528606Z"
              fill="#B4BDC4"
            />
          </svg>
        )}
        {breadcrumb && (
          <p className={styles.pagetop__breadcrumb} onClick={() => navigate(from)}>
            {breadcrumb}
          </p>
        )}
        {itemName && (
          <svg width="16" height="10" viewBox="0 0 6 10" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.528758 0.528606C0.789108 0.268256 1.21122
              0.268256 1.47157 0.528606L5.47157 4.52861C5.73192
              4.78896 5.73192 5.21107 5.47157 5.47141L1.47157
              9.47141C1.21122 9.73176 0.789108 9.73176 0.528758
              9.47141C0.268409 9.21107 0.268409 8.78896 0.528758
              8.52861L4.05735 5.00001L0.528758 1.47141C0.268409
              1.21107 0.268409 0.788955 0.528758 0.528606Z"
              fill="#B4BDC4"
            />
          </svg>
        )}
        {itemName && <p className={styles['pagetop__item-name']}>{itemName}</p>}
      </div>
      {productInfo && (
        <div className={styles.product__info}>
          <h1 style={{ margin: '0' }}>{title}</h1>
          <p className={`${styles['products__info-models']} body-text`}>
            {`${productsLength} models`}
          </p>
        </div>
      )}
      {dropdowns && <DropDowns />}
    </div>
  );
};
