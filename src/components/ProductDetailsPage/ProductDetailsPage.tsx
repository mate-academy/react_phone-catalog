import { Link, useLocation, useParams } from 'react-router-dom';
import { Breadcrumbs } from '../Breadcrumbs';
import { useEffect, useState } from 'react';
import { getProductById } from '../../api';
import { ProductDetails } from '../../types/ProductsDetails';
import { CategoryType } from '../../types/Category';
import styles from './ProductDetails.module.scss';
import { Loader } from '../Loader';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const location = useLocation();
  const category = location.pathname.split('/')[1];

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [isError, setIsError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError('');

    getProductById(category as CategoryType)
      .then(products => {
        const productDetail = products.filter(
          (item: ProductDetails) => item.id === productId,
        );

        setProduct(productDetail);
      })
      .catch(() => setIsError('Product was not found'))
      .finally(() => setIsLoading(false));
  }, [category, productId]);

  return (
    <section className={styles['product-details']}>
      <div className="container">
        <Breadcrumbs category={category} productName={product?.name} />
        <Link
          to={`/${category}`}
          className={styles['product-details__back-btn']}
        >
          Back
        </Link>
        {isLoading && <Loader />}
        {!isLoading && isError && (
          <div className="product-details__img-box">
            <img
              className="product-details__img"
              src="/img/product-not-found.png"
              alt="Product not found"
            />
          </div>
        )}
        {!isLoading && !isError && (
          <div className="product-details__content">
            <h2 className="title">{product?.name}</h2>
          </div>
        )}
      </div>
    </section>
  );
};
