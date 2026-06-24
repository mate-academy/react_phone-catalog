import { Link, useLocation, useParams } from 'react-router-dom';
import './Breadcrumbs.scss';
import React, { useEffect, useState } from 'react';
import { useProductFilters } from '../../../hooks/useProductsFilters';
import { ProductUnionType } from '../../ProductInfoPage';
import { useTheme } from '../../../components/context/ThemeContext';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const { category, itemId } = useParams();
  const { getLastSearch } = useProductFilters();
  const { theme } = useTheme();

  const [modelName, setModelName] = useState('');

  const pathname = location.pathname.replace('/', '');

  const pageName = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : pathname
      ? pathname.charAt(0).toUpperCase() + pathname.slice(1)
      : '';

  const backSearch = location.state?.search || location.search || '';
  const searchToUse = backSearch !== '' ? backSearch : getLastSearch();

  const backPath = `/${category || ''}`;
  const backWithSearch = `${backPath}${searchToUse}`;

  useEffect(() => {
    if (!category || !itemId) {
      return;
    }

    fetch(`/api/${category}.json`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(
          (product: ProductUnionType) => product.id === itemId,
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
                ? './img/icons/Breadcrumbs-Home_icon.svg'
                : './img/icons/Breadcrumbs-Home_dark.svg'
            }
            alt="Home icon"
            className="icon"
          />
        </Link>
        <img
          src={
            theme === 'light'
              ? './img/icons/Breadcrumbs-Separator_icon.svg'
              : './img/icons/Arrow-Right_dark.svg'
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
                  ? './img/icons/Breadcrumbs-Separator_icon.svg'
                  : './img/icons/Arrow-Right_dark.svg'
              }
              alt="Breadcrumbs Separator"
              className="icon breadcrumbs__separator"
            />

            <span
              className="breadcrumbs__current
                breadcrumbs__current--product"
            >
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
                  ? './img/icons/Arrow-Left_icon.svg'
                  : './img/icons/Arrow-Left_dark.svg'
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
