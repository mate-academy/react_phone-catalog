import { useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../helpers/hooks/hooks';
import { Loader } from '../../components/Loader/Loader';
import { NoResults } from '../../components/NoResult/NoResult';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import './ProductsPage.scss';
import { ProductsList } from '../../components/ProductList/ProductsList';

export const ProductsPage = () => {
  const {
    products,
    isLoading,
    hasError,
  } = useAppSelector(
    (state) => state.products,
  );
  const { pathname } = useLocation();
  const productType = pathname.slice(1);
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || 'year';
  const title
    = productType === 'phones'
      ? 'Mobile phones'
      : productType[0].toUpperCase() + productType.slice(1);

  const sortedProducts = useMemo(() => {
    return products
      .filter(product => product.category === productType)
      .sort((p1, p2) => {
        switch (sortBy) {
          case 'year':
            return p2[sortBy] - p1[sortBy];
          case 'price':
            return p1[sortBy] - p2[sortBy];
          case 'name':
            return p1[sortBy].localeCompare(p2[sortBy]);
          default:
            return 0;
        }
      });
  }, [sortBy, products, productType]);
  const productsCount = sortedProducts.length;

  return (
    <div className="page container">
      <div className="page__breadcrumbs">
        <Breadcrumbs />
      </div>

      {isLoading && <Loader />}

      {!isLoading && hasError && (
        <h1 className="page__title">{`Can't load ${title}`}</h1>
      )}

      {!isLoading && !hasError && productsCount === 0 && (
        <NoResults type={title} />
      )}

      {!isLoading && !hasError && productsCount > 0 && (
        <>
          <h1 className="page__title">{title}</h1>
          <ProductsList products={sortedProducts} />
        </>
      )}
    </div>
  );
};
