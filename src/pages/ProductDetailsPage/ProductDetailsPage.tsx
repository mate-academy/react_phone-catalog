import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './ProductDetailsPage.scss';
import { Product, ProductDescription } from '../../types/product';
import { getAllProducts, getProduct } from '../../api/productApi';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { MyLoader } from '../../components/UI/MyLoader';
import { ProductDetails } from '../../components/ProductDetails';
import { ProductSlider } from '../../components/ProductsSlider';
import { MyBackLink } from '../../components/UI/MyBackLink';

async function getSuggestedProducts() {
  const products = await getAllProducts<Product[]>();

  return products.filter(el => el.capacity.includes('512'));
}

export const ProductDetailsPage = () => {
  const [product, setProduct]
    = useState<ProductDescription>({} as ProductDescription);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [errorSuggested, setErrorSuggested] = useState('');

  const { productId } = useParams();

  if (!product) {
    setErrorMessage('There is no data for this product...');
  }

  useEffect(() => {
    if (!productId) {
      return;
    }

    getProduct<ProductDescription>(productId)
      .then(setProduct)
      .catch(() => setErrorMessage('Something went wrong...'));

    getSuggestedProducts()
      .then(setSuggestedProducts)
      .catch(() => setErrorSuggested('Something went wrong...'))
      .finally(() => setLoading(false));
  }, [productId]);

  return (
    <div className="product-details">
      <header className="product-details__header">
        <div className="product-details__breadcrumbs" data-cy="breadCrumbs">
          <BreadCrumbs />
        </div>

        <MyBackLink />
        <h1 className="product-details__title">
          {product?.name}
        </h1>
      </header>

      <main>
        {loading
          ? <MyLoader />
          : (
            <>
              {!errorMessage
                ? <ProductDetails product={product} />
                : <p>{errorMessage}</p>}
            </>
          )}
      </main>

      <footer className="product-details__footer">
        <h2 className="product-details__title">You may also like</h2>

        {errorSuggested
          ? <p>{errorSuggested}</p>
          : <ProductSlider products={suggestedProducts} />}
      </footer>
    </div>
  );
};
