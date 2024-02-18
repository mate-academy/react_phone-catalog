import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import './ProductDetailsPage.scss';
import { ProductDescription } from '../../types/product';
import { getProduct } from '../../api/productApi';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { MyLoader } from '../../components/UI/MyLoader';
import { ProductDetails } from '../../components/ProductDetails';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct]
    = useState<ProductDescription>({} as ProductDescription);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  if (!product) {
    setErrorMessage('There is no data for this product...');
  }

  useEffect(() => {
    if (!productId) {
      return;
    }

    getProduct<ProductDescription>(productId)
      .then(setProduct)
      .catch(() => setErrorMessage('Something went wrong...'))
      .finally(() => setLoading(false));
  }, [productId]);

  return (
    <div className="product-details">
      <header className="product-details__header">
        <BreadCrumbs />
        <Link to=".." className="product-details__back">Back</Link>
        <h1 className="product-details__title">
          Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)
        </h1>
      </header>
      <main>
        {loading
          ? <MyLoader />
          : (
            <>
              {errorMessage
                ? <p>{errorMessage}</p>
                : <ProductDetails product={product} />}
            </>
          )}
      </main>

      <footer>footer</footer>
    </div>
  );
};
