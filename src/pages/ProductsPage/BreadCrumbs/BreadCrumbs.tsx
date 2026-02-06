import React, { useEffect, useState } from 'react';
import './BreadCrumbs.scss';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useProductFilters } from '../../../hooks/useProductsFilters';
import { useTheme } from '../../../components/context/ThemeContext';
import { ProductUnionType } from '../../ProductInfoPage';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const { category, itemId } = useParams();
  const { getLastSearch } = useProductFilters();
  const { theme } = useTheme();
  const [modelName, setModelName] = useState('');
  const pathName = location.pathname.replace('/', '');
  const pageName = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : pathName
      ? pathName.charAt(0).toUpperCase() + pathName.slice(1)
      : '';
  const backSearch = location.state?.search || location.search || '';
  const searchToUse = backSearch !== '' ? backSearch : getLastSearch();
  const backPath = `/${category || ''}`;
  const backWithSearch = `${backPath}${searchToUse}`;

  useEffect(() => {
    if (!category || !itemId) {
      return;
    }

    fetch(import.meta.env.BASE_URL + `/api/${category}.json`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(
          (product: ProductUnionType) => product.id == itemId,
        );

        setModelName(found.name || '');
      });
  }, [itemId, category]);

  return (
    <div className="breadcrumbs">
      <div className="breadcrumbs__nav">
        <Link to="/" className="breadcrumbs__link breadcrumbs__link--home">
          <img
            src={
              theme === 'light'
                ? import.meta.env.BASE_URL +
                  'img/icons/Breadcrumbs-Home_icon.svg'
                : import.meta.env.BASE_URL +
                  'img/icons/Breadcrumbs-Home_icon.svg'
            }
            alt="Home icon"
            className="icon"
          />
        </Link>
        <img
          src={
            theme === 'light'
              ? import.meta.env.BASE_URL + 'img/icons/Arrow-Right_icon.svg'
              : import.meta.env.BASE_URL + 'img/icons/Arrow-Right_icon.svg'
          }
          alt="Breadcrumbs Separator"
          className="icon breadcrumbs__separator"
        />

        {itemId ? (
          <Link
            to={backWithSearch}
            className="breadcrumbs__link breadcrumbs__link--category"
          >
            {pageName}
          </Link>
        ) : (
          <span className="breadcrumbs__current">{pageName}</span>
        )}

        {modelName && (
          <>
            <img
              src={
                theme === 'light'
                  ? import.meta.env.BASE_URL + 'img/icons/Arrow-Right_icon.svg'
                  : import.meta.env.BASE_URL + 'img/icons/Arrow-Right_icon.svg'
              }
              alt="Breadcrumbs Separator"
              className="icon breadcrumbs__separator"
            />
            {/* eslint-disable-next-line max-len */}
            <span className="breadcrumbs__current breadcrumbs__current--proudct">
              {modelName}
            </span>
          </>
        )}
      </div>
      {modelName && (
        <div className="breadcrumbs__back">
          <Link to={backWithSearch} className="breadcrumbs__back--icon">
            <img
              src={
                theme === 'light'
                  ? import.meta.env.BASE_URL + 'img/icons/Arrow-Left_icon.svg'
                  : import.meta.env.BASE_URL + 'img/icons/Arrow-Left_icon.svg'
              }
              alt="Back Arrow"
              className="icon"
            />
          </Link>

          <Link to={backWithSearch} className="breadcrumbs__back--link">
            Back
          </Link>
        </div>
      )}
    </div>
  );
};
