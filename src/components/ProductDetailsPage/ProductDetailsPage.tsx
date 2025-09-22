import { useLocation, useParams } from 'react-router-dom';
import { Breadcrumbs } from '../Breadcrumbs';
import { useEffect, useState } from 'react';
import { getProductById } from '../../api';
import { ProductDetails } from '../../types/ProductsDetails';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const location = useLocation();
  const category = location.pathname.split('/')[1];

  const [products, setProducts] = useState<ProductDetails[]>([]);
  const [isError, setIsError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getProductById(category as 'phones' | 'tablets' | 'accessories', productId)
      .then(setProducts)
      .catch(() => setIsError('Product was not found'))
      .finally(() => setIsLoading(false));
  }, [category]);

  return (
    <section className="product-details">
      <div className="container">
        <Breadcrumbs category={category} />
      </div>
    </section>
  );
};
