import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CustomSelect } from '../utils/CustomSelect';
import { SearchParams, getSearchWith } from './searchHelper';
import { ProductList } from './ProductList';
import { PathBlock } from '../utils/Path';
import { Product } from '../../types/product';
import { getProducts } from '../../api/api';
import './ProductsPage.scss';

export const ProductsPage: React.FC = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const sortBy = searchParams.get('sortBy') || t('Newest');
  const perPage = searchParams.get('perPage') || '4';
  const searchQuery = searchParams.get('query') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [isEmptyProduct, setIsEmptyProducts] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsLoadingError(false);
    setIsEmptyProducts(false);

    getProducts()
      .then(fethProd => {
        const prodByCategory = fethProd.filter(
          prod => prod.category === category,
        );

        setProducts(prodByCategory);

        if (!prodByCategory.length) {
          setIsEmptyProducts(true);
        }
      })
      .catch(() => setIsLoadingError(true))
      .finally(() => setIsLoading(false));
  }, [category]);

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  const optionsSortBy = [
    { value: t('Newest'), label: t('Newest') },
    { value: t('Alphabetically'), label: t('Alphabetically') },
    { value: t('Price: Low to High'), label: t('Price: Low to High') },
    { value: t('Price: High to Low'), label: t('Price: High to Low') },
    { value: t('RAM'), label: t('RAM') },
    { value: t('Color'), label: t('Color') },
  ];

  const optionsItemOnPage = [
    { value: '4', label: '4' },
    { value: '8', label: '8' },
    { value: '16', label: '16' },
    { value: `${products.length}`, label: t('all') },
  ];

  const handleOptionChange = (value: string) => {
    const newParams: SearchParams = { perPage: value };

    if (value !== '4') {
      newParams.page = '1';
    } else {
      newParams.page = null;
    }

    setSearchWith(newParams);
  };

  const handleSortChange = (value: string) => {
    const newParams: SearchParams = { sortBy: value, page: '1' };

    setSearchWith(newParams);
  };

  const defaultSearchParams: SearchParams = {
    sortBy: t('Newest'),
    perPage: '4',
  };
  const currentSearchParams = Object.fromEntries(searchParams.entries());
  const isFirstLoad = Object.keys(currentSearchParams).length === 0;

  if (isFirstLoad) {
    setSearchWith(defaultSearchParams);
  }

  if (isEmptyProduct) {
    return <h1 style={{ marginTop: '20px' }}>{t(`h1.empty.${category}`)}</h1>;
  }

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="container">
      <div className="ProductsPage">
        <PathBlock category={category} />

        <h1 className="ProductsPage__title">{t(`h1.title.${category}`)}</h1>
        <p className="ProductsPage__models-length body-text">
          {t('p.models', { length: products.length })}
        </p>
        <div className="ProductsPage__selectors">
          <div className="ProductsPage__selectors--sort-by">
            <label
              htmlFor="itemsOnPage"
              className="ProductsPage__selectors--label small-text"
            >
              {t('Sort by')}
            </label>
            <CustomSelect
              options={optionsSortBy}
              value={sortBy}
              onChange={handleSortChange}
              className="ProductsPage__selectors--selector-sort-by"
            />
          </div>

          <div className="ProductsPage__selectors--items-on-page">
            <label
              htmlFor="sort-by"
              className="ProductsPage__selectors--label small-text"
            >
              {t('Items on page')}
            </label>
            <CustomSelect
              options={optionsItemOnPage}
              value={perPage}
              onChange={handleOptionChange}
              className="ProductsPage__selectors--selector-items-on-page"
            />
          </div>
        </div>
        {isLoadingError ? (
          <div className="modal">
            <div className="modal__window">
              <h4 className="modal__text">{t('Something went wrong')}</h4>
              <div className="modal__buttons">
                <button
                  onClick={() => window.location.reload()}
                  className="modal__buttons--confirm button button-primary"
                >
                  {t('Reload')}
                </button>
              </div>
            </div>
          </div>
        ) : !filteredProducts.length && !!products.length ? (
          <h4 style={{ marginTop: '20px' }}>
            {t(`h4.empty.${category}`, { count: 1 })}
          </h4>
        ) : (
          <div className="ProductsPage__cards">
            <ProductList products={filteredProducts} isLoading={isLoading} />
          </div>
        )}
      </div>
    </div>
  );
};
