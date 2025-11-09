import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Product } from '../../api/types';
import { DataContext } from '../../context/ContextProvider';
import scss from './ProductDetailsPage.module.scss';
import { Loader } from '../shared/components/Loader';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { ButtonBack } from '../shared/components/ButtonBack';

export const ProductDetailsPage = () => {
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [isError, setIsError] = useState<boolean>(false);

  const { productId } = useParams();
  const { products, isLoading } = useContext(DataContext);

  useEffect(() => {
    if (products && products.length > 0) {
      const detailProd = products.find(prod => prod.itemId === productId);

      if (detailProd) {
        setProduct(detailProd);
        setIsError(false);
      } else {
        setProduct(undefined);
        setIsError(true);
        // eslint-disable-next-line no-console
        console.error('Product was not found -->', productId);
      }
    }
  }, [products, productId]);

  const navigate = useNavigate();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className={scss.errorNotification}>
        <h2>Product was not found</h2>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className={scss.errorNotification__button}
        >
          Go back to previous page
        </button>
      </div>
    );
  }

  if (product === undefined) {
    return <Loader />;
  }

  return (
    <section>
      <Breadcrumbs category={product.category} productName={product.name} />
      <ButtonBack />
      <p>Polska</p>
    </section>
  );
};
