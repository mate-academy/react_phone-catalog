import { useSearchParams } from 'react-router-dom';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { DropdownMenu } from '../../components/DropdownMenu';
import { ItemsDropdown } from '../../components/ItemsDropdown/ItemsPropdown';
import { Pagination } from '../../components/Pagination';
import { PorductList } from '../../components/ProductList';
import { CategoriesTypes } from '../../types/CategoriesTypes';
import { Product } from '../../types/Product';
import './TabletsPage.scss';
import { getItemsOnPage } from '../../services/getItemsOnPage';
import { useAppSelector } from '../../hooks/hooks';
import { useEffect } from 'react';
import { getNewProducts } from '../../services/getNewProducts';
import { setProds } from '../../features/prods';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Skeletons } from '../../components/Skeletons';
import { NotFoundProductPage } from '../NotFoundProductPage';
import { useTranslation } from 'react-i18next';

export const TabletsPage: React.FC = () => {
  const [isloading, setIsLoading] = useState(false);
  const type = CategoriesTypes.Tablets;

  const { t } = useTranslation();
  const { prods } = useAppSelector(state => state.prods);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort' || '');
  const query = searchParams.get('query' || '');

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

  const sortedProducts = sortProducts(filteredProducts, sort as string);

  const curPage = searchParams.get('page') || 1;
  const perPage = searchParams.get('perPage');

  const itemsOnPage = getItemsOnPage(perPage, curPage, filteredProducts);

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
      <NotFoundProductPage title={t('tabletsPage.notFoundProduct.tablets')} />
    );
  }

  return (
    <div className="tabletsPage" id="tablets">
      <div className="container">
        <BreadCrumbs />
        <div className="tabletsPage__title">
          <h1 className="tabletsPage__title-text">
            {t('tabletsPage.title.text')}
          </h1>
          <p className="tabletsPage__title-count">
            {t('tabletsPage.title.count', { count: filteredProducts.length })}
          </p>
        </div>

        <div className="tabletsPage__dropdownBox">
          <DropdownMenu />

          <ItemsDropdown />
        </div>

        {isloading ? (
          <Skeletons products={itemsOnPage} />
        ) : (
          <>
            <PorductList products={itemsOnPage} />
          </>
        )}

        {perPage && <Pagination totalItems={sortedProducts.length} />}
      </div>
    </div>
  );
};
