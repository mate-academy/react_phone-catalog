/* eslint-disable max-len */
/* eslint-disable prettier/prettier */

import { Link } from 'react-router-dom';

import arrowRight from '@/assets/svg/arrow-right-gray.svg';
import homeIcon from '@/assets/svg/home.svg';

import styles from './Breadcrumbs.module.scss';

const {
  breadcrumbs,
  breadcrumbsLink,
  breadcrumbsLinkActive,
  breadcrumbsIcon,
  breadcrumbsArrow,
  breadcrumbsText,
} = styles;

interface Props {
  pageTitle: string;
  productName?: string;
};

export const Breadcrumbs: React.FC<Props> = ({ pageTitle, productName }) => {
  const editedPageTitle = pageTitle
    ? pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1)
    : '';

  return (
    <nav className={breadcrumbs} aria-label="breadcrumb">
      {/* 1 рівень: Головна */}
      <Link className={breadcrumbsLink} to="/">
        <img className={breadcrumbsIcon} src={homeIcon} alt="Home" />
      </Link>

      <div className={breadcrumbsArrow}>
        <img src={arrowRight} />
      </div>

      {/* 2 рівень: Категорія (стає посиланням, лише якщо є productName) */}
      {productName ? (
        <>
          <Link
            className={`${breadcrumbsLink} ${breadcrumbsLinkActive}`}
            to={`/${pageTitle.toLowerCase()}`}
          >
            {editedPageTitle}
          </Link>

          <div className={breadcrumbsArrow}>
            <img src={arrowRight} />
          </div>
        </>
      ) : (
        <span className={breadcrumbsText}>{editedPageTitle}</span>
      )}

      {/* 3 рівень: Назва продукту */}
      {productName &&
        <span className={breadcrumbsText}>{productName}</span>
      }

    </nav>
  );
};
