import React from 'react';
import { ProductsList } from '../ProductsList/ProductsList';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const AccessoriesPage: React.FC = () => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || 'all';

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const newParams = new URLSearchParams(searchParams);

    newParams.set('sort', value);
    newParams.delete('page');
    setSearchParams(newParams);
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const newParams = new URLSearchParams(searchParams);

    if (value === 'all') {
      newParams.delete('perPage');
    } else {
      newParams.set('perPage', value);
    }

    newParams.delete('page');
    setSearchParams(newParams);
  };

  return (
    <>
      <div className="container">
        <div className="breadcrumbs">
          <Link to="/" className="breadcrumbs__link">
            <div className="home-icon"></div>
          </Link>
          <div className="arrow-icon"></div>
          <p className="breadcrumbs__title">{t('accessories')}</p>
        </div>

        <div className="products-page">
          <h1 className="products-page__title">{t('accessories')}</h1>
          <p className="products-page__description">100 {t('models')}</p>

          <div className="products-page__params">
            <div className="products-page__params-sort">
              <p className="products-page__params-sort-title">{t('sort-by')}</p>
              <select
                className="products-page__params-sort-select"
                value={sort}
                onChange={handleSortChange}
              >
                <option value="age">{t('newest')}</option>
                <option value="title">{t('alphabetically')}</option>
                <option value="price">{t('cheapest')}</option>
              </select>
            </div>

            <div className="products-page__params-items">
              <p className="products-page__params-items-title">
                {t('items-on-page')}
              </p>
              <select
                className="products-page__params-items-select"
                value={perPage}
                onChange={handlePerPageChange}
              >
                <option value="all">{t('all')}</option>
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="16">16</option>
              </select>
            </div>
          </div>

          <ProductsList type="accessories" />
        </div>
      </div>
    </>
  );
};
