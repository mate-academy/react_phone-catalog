import { useProductsContext } from 'contexts/ProductsContext';
import { NotFoundPage } from 'modules/NotFoundPage';
import { RouteParams } from 'modules/shared/types/Routes';
import { useParams } from 'react-router-dom';

export const ProductsPage = () => {
  const { category } = useParams<RouteParams>();
  const { data, loading } = useProductsContext();
  const products = category ? data[category] : undefined;

  if (!products) {
    return <NotFoundPage />;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>
        {category
          ? category.charAt(0).toUpperCase() + category.slice(1)
          : 'Category'}
      </h1>

      <p> {products.length}</p>
    </div>
  );
};
