import { useLocation, useSearchParams } from 'react-router-dom';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { useAppSelector } from '../../helpers/hooks/hooks';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Loader } from '../../components/Loader/Loader';
import './ProductsPage.scss';

export const ProductsPage = () => {
  const { pathname } = useLocation();

  const {
    products,
    isLoading,
    hasError,
  } = useAppSelector(state => state.products);

  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || 'year';
  const productType = pathname.slice(1);

  const title
  = productType === 'phones'
    ? 'Mobile phones'
    : productType[0].toUpperCase() + productType.slice(1);

  const sortedProducts = products
    .filter((product) => product.category === productType)
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

  return (
    <div className="productsPage">
      <div className="productsPage__breadcrumbs">
        <Breadcrumbs />
      </div>

      {isLoading && <Loader />}

      {!isLoading && hasError && (
        <h1 className="page__title">{`Can't load ${title}`}</h1>
      )}

      {!isLoading && !hasError && sortedProducts.length === 0 && (
        <h1 className="productsPage__title">
          {`${title} not found`}
        </h1>
      )}

      {!isLoading && !hasError && sortedProducts.length > 0 && (
        <div className="productsPage__content">
          <h1 className="productsPage__title">{title}</h1>

          <ProductsList products={sortedProducts} />
        </div>
      )}
    </div>
  );
};
