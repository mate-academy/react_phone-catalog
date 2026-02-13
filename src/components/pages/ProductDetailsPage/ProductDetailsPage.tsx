import React, { useContext, useEffect, useMemo, useState } from 'react';
import './ProductDetailsPage.scss';
import { useLocation, useParams } from 'react-router-dom';
import { ButtonBack } from '../../shared/ButtonBack';
import { Breadcrumbs } from '../../shared/Breadcrumbs';
import { Loader } from '../../shared/Loader';
import { ProductDetails } from '../../../types/ProductDetails';
import { getSpecificProducts } from '../../../utils/api';
import { ProductSlider } from '../../shared/ProductSlider';
import { GlobalContext } from '../../context/GlobalContext';
import { ProductHeadInfo } from '../../shared/ProductHeadInfo';
import { ProductAddInfo } from '../../shared/ProductAddInfo';

export const ProductDetailsPage: React.FC = () => {
  const { productId = '' } = useParams();

  const { allProducts } = useContext(GlobalContext);

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [connectedProducts, setConnectedProducts] = useState<ProductDetails[]>(
    [],
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const currentCategory = useLocation().pathname.split('/')[1];

  useEffect(() => {
    setLoading(true);
    setError('');

    const timeout = setTimeout(() => {
      getSpecificProducts(currentCategory)
        .then(fetchedSpecificProducts => {
          const currentProduct = fetchedSpecificProducts.find(
            fetchedProduct => fetchedProduct.id === productId,
          );

          if (currentProduct) {
            setProduct(currentProduct);
            setConnectedProducts(
              [...fetchedSpecificProducts].filter(
                prod => prod.namespaceId === currentProduct.namespaceId,
              ),
            );
            // console.log(connectedProducts);
            setError('');
          } else {
            setProduct(null);
            setError('Product not found');
          }
        })
        .catch(() => {
          setError('Error! This product does not exist.');
        })
        .finally(() => {
          setLoading(false);
        });
    }, 500);

    return () => clearTimeout(timeout);
  }, [currentCategory, productId]);

  const mayAlsoLikeProducts = useMemo(
    () =>
      [...allProducts]
        .filter(
          prod =>
            prod.category === product?.category &&
            prod.itemId !== product.id &&
            prod.fullPrice >= product.priceRegular - 100,
        )
        .sort((product1, product2) => product2.year - product1.year),
    [allProducts, product],
  );

  if (loading) {
    return (
      <main className="main product-details">
        <div className="product-details__loader">
          <Loader />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="main product-details">
        <div className="product-details__error">
          <span className="product-details__error-text">{error}</span>
          <ButtonBack />
        </div>
      </main>
    );
  }

  if (!product) {
    return;
  }

  return (
    <main className="main product-details">
      <div className="product-details__breadcrumbs">
        <Breadcrumbs />
      </div>

      <div className="product-details__button-back">
        <ButtonBack />
      </div>

      <h1 className="product-details__title">{product?.name}</h1>
      <ProductHeadInfo
        product={product}
        connectedProducts={connectedProducts}
      />
      <ProductAddInfo product={product} />

      <ProductSlider title="You may also like" products={mayAlsoLikeProducts} />
    </main>
  );
};
