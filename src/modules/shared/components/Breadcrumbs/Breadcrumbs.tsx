/* eslint-disable max-len */
/* eslint-disable prettier/prettier */

//#region IMPORTS
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import arrowRight from '@/assets/svg/arrow-right-gray.svg';
import homeIcon from '@/assets/svg/home.svg';

import styles from './Breadcrumbs.module.scss';
//#endregion IMPORTS

//#region STYLES
const {
  breadcrumbs,
  breadcrumbsLink,
  breadcrumbsLinkActive,
  breadcrumbsIcon,
  breadcrumbsArrow,
  breadcrumbsText,
} = styles;
//#endregion STYLES

interface Props {
  pageTitle: string;
  pagePath?: string;
  productName?: string;
}

export const Breadcrumbs: React.FC<Props> = ({ pageTitle, pagePath, productName }) => {
  //#region HOOKS
  const { t } = useTranslation();
  //#endregion

  //#region HANDLERS_&_HELPERS
  const editedPageTitle = pageTitle
    ? pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1)
    : '';

  const targetPath = pagePath
    ? `/${pagePath}`
    : `${pageTitle.toLowerCase()}`;
  //#endregion HANDLERS_&_HELPERS

  //#region RENDER
  return (
    <nav className={breadcrumbs} aria-label="breadcrumb">
      {/* 1 рівень: Головна */}
      <Link className={breadcrumbsLink} to="/">
        <img
          className={breadcrumbsIcon}
          src={homeIcon}
          alt={t('header.navigation.home')}
        />
      </Link>

      <div className={breadcrumbsArrow} aria-hidden="true">
        <img src={arrowRight} alt="" />
      </div>

      {/* 2 рівень: Категорія (стає посиланням, лише якщо є productName) */}
      {productName ? (
        <>
          <Link
            className={`${breadcrumbsLink} ${breadcrumbsLinkActive}`}
            to={targetPath}
          >
            {editedPageTitle}
          </Link>

          <div className={breadcrumbsArrow} aria-hidden="true">
            <img src={arrowRight} alt="" />
          </div>
        </>
      ) : (
        <span className={breadcrumbsText}>{editedPageTitle}</span>
      )}

      {/* 3 рівень: Назва продукту */}
      {productName &&
        <span className={breadcrumbsText}>
          {productName}
        </span>}
    </nav>
  );
  //#endregion RENDER
};
