import { useTranslation } from 'react-i18next';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import styles from './AccessoriesPage.module.scss';
import { useAppSelector } from '../../hooks/hooks';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getNewProducts } from '../../services/getNewProducts';
import { useEffect, useState } from 'react';
import { setProducts } from '../../features/productsSlice';
import { Categories } from '../../types/Categories';
import { SortByDropdown } from '../../components/SortByDropdown';
import { ItemsPerPageDropdown } from '../../components/ItemsPerPageDropdown';
import { Product } from '../../types/Product';
import { ProductGallery } from '../../components/ProductGallery';
import { getItemsPerPage } from '../../services/getItemsPerPage';
import { LoaderProductCard } from '../../components/LoaderProductCard';
import { Pagination } from '../../components/Pagination/Pagination';
import { ProductNotFoundPage } from '../ProductNotFoundPage';

export const AccessoriesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  const { products } = useAppSelector(state => state.products);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const query = searchParams.get('search');

  const type = Categories.Accessories;

  const filteredProducts = products.filter(product => {
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
      case `${t('sortByDropdown.option.newest')}`:
        return item.sort((a, b) => b.year - a.year);

      case `${t('sortByDropdown.option.alphabetically')}`:
        return item.sort((a, b) => a.name.localeCompare(b.name));

      case `${t('sortByDropdown.option.cheapest')}`:
        return item.sort((a, b) => a.price - b.price);

      default:
        return item;
    }
  };

  const sortedProducts = sortProducts(filteredProducts, sort as string);
  const page = searchParams.get('page') || 1;
  const perPage = searchParams.get('perPage');

  const itemsPerPage = getItemsPerPage(perPage, page, filteredProducts);

  useEffect(() => {
    setIsLoading(true);

    getNewProducts()
      .then(resolve => {
        const newProducts = resolve.map(item => ({ ...item, quantity: 1 }));

        dispatch(setProducts(newProducts));
      })
      .catch(
        () =>
          // eslint-disable-next-line max-len
          'Oops! Something went wrong while loading data. Please try again later.',
      )
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  }, [dispatch, searchParams]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  if (!itemsPerPage.length && !isLoading) {
    return <ProductNotFoundPage title={t('productNotFoundPage.accessories')} />;
  }

  return (
    <div className={styles.accessoriesPage} id="accessories">
      <div className={styles.container}>
        <BreadCrumbs />
        <h1 className={styles.title}>{t('accessoriesPage.title')}</h1>
        <p className={styles.count}>
          {t('accessoriesPage.count', { count: filteredProducts.length })}
        </p>

        <div className={styles.dropdownContainer}>
          <SortByDropdown />
          <ItemsPerPageDropdown />
        </div>
        {isLoading ? (
          <LoaderProductCard products={itemsPerPage} />
        ) : (
          <ProductGallery products={itemsPerPage} discount />
        )}

        {perPage && <Pagination totalItems={sortedProducts.length} />}
      </div>
    </div>
  );
};
