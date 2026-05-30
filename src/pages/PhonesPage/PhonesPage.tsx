import { DropdownMenu } from '../../components/DropdownMenu';
import { PorductList } from '../../components/ProductList';
import { CategoriesTypes } from '../../types/CategoriesTypes';
import { ItemsDropdown } from '../../components/ItemsDropdown/ItemsPropdown';
import { useSearchParams } from 'react-router-dom';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { getItemsOnPage } from '../../services/getItemsOnPage';
import { Pagination } from '../../components/Pagination';
import { useAppSelector } from '../../hooks/hooks';
import React, { useEffect } from 'react';
import { getNewProducts } from '../../services/getNewProducts';
import { useDispatch } from 'react-redux';
import { setProds } from '../../features/prods';
import { useState } from 'react';
import { Product } from '../../types/Product';

import './PhonesPage.scss';
import { Skeletons } from '../../components/Skeletons';
import { NotFoundProductPage } from '../NotFoundProductPage';
import { useTranslation } from 'react-i18next';

export const PhonesPage: React.FC = () => {
  const [isloading, setIsLoading] = useState(false);
  const type = CategoriesTypes.Phones;
  const { t } = useTranslation();

  const { prods } = useAppSelector(state => state.prods);

  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const sort = searchParams.get('sort');

  const sortProducts = (item: Product[], sortType: string) => {
    switch (sortType) {
      case `${t('dropdownMenu.item.newest')}`:
        return item.sort((a, b) => b.year - a.year);

      case `${t('dropdownMenu.item.alphabetically')}`:
        return item.sort((a, b) => a.name.localeCompare(b.name));

      case `${t('dropdownMenu.item.cheapset')}`:
        return item.sort((a, b) => a.price - b.price);

      default:
        return item;
    }
  };

  const filteredProducts = prods.filter(product => {
    if (query) {
      return (
        product.category === type &&
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      return product.category === type;
    }
  });

  const sortedProducts = sortProducts(filteredProducts, sort as string);

  const page = searchParams.get('page') || 1;
  const perPage = searchParams.get('perPage');

  const itemsOnPage = getItemsOnPage(perPage, page, filteredProducts);

  useEffect(() => {
    setIsLoading(true);

    getNewProducts()
      .then(resolve => {
        const newProds = resolve.map(item => ({ ...item, quantity: 1 }));

        dispatch(setProds(newProds));
      })
      .catch(() => 'Unable to load data from server!')
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  }, [dispatch, searchParams]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  if (!itemsOnPage.length && !isloading) {
    return (
      <NotFoundProductPage title={t('phonesPage.notFoundProduct.phones')} />
    );
  }

  return (
    <div className="phonesPage" id="phones">
      <div className="container">
        <BreadCrumbs />
        <div className="phonesPage__title">
          <h1 className="phonesPage__title-text">
            {t('phonesPage.title.text')}
          </h1>
          <p className="phonesPage__title-count">
            {t('phonesPage.title.count', { count: filteredProducts.length })}
          </p>
        </div>

        <div className="phonesPage__dropdownBox">
          <DropdownMenu />

          <ItemsDropdown />
        </div>

        {isloading && <Skeletons products={itemsOnPage} />}

        {!isloading && <PorductList products={itemsOnPage} />}

        {perPage && <Pagination totalItems={sortedProducts.length} />}
      </div>
    </div>
  );
};
