import React, { useEffect, useState } from 'react';
import './ProductDetailsPage.scss';
import { useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { getProductDetails, getProducts } from '../../api/getProducts';
import { ProductDetails } from '../../types/ProductDetails';
import { NavMap } from '../../components/NavMap';
import { ProductDetalisCard } from '../../components/ProductDetalisCard';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Product } from '../../types/Product';
import {
  getSuggestedProducts,
} from '../../helpers/getFunctions/getSuggestedProducts';

export const ProductDetailsPage: React.FC = () => {
  const [product, setProduct] = useState<ProductDetails>(
    {} as unknown as ProductDetails,
  );

  const { productId } = useParams();

  const [isLoadingProductId, setIsLoadingProductId] = useState(false);
  const [isErrorProductId, setIsErrorProductId] = useState(false);

  useEffect(() => {
    setIsLoadingProductId(true);
    setIsErrorProductId(false);
    window.scrollTo(0, 0);

    getProductDetails(productId as string)
      .then(productsFromServer => (
        setProduct(productsFromServer)
      ))
      .catch(() => setIsErrorProductId(true))
      .finally(() => setIsLoadingProductId(false));
  }, [productId]);

  const [randomProducts, setRandomProducts] = useState<Product[]>([]);

  const [isLoadingRandomProducts, setIsLoadingRandomProducts] = useState(false);
  const [isErrorRandomProducts, setIsErrorRandomProducts] = useState(false);

  useEffect(() => {
    setIsLoadingRandomProducts(true);
    setIsErrorRandomProducts(false);

    getProducts()
      .then(productsFromServer => (
        setRandomProducts(getSuggestedProducts(productsFromServer))
      ))
      .catch(() => setIsErrorRandomProducts(true))
      .finally(() => setIsLoadingRandomProducts(false));
  }, [productId]);

  const getSlider = (
    products: Product[],
    title: string,
    isLoading: boolean,
    isError: boolean,
  ) => {
    if (isLoading) {
      return <Loader />;
    }

    if (isError) {
      return <p className="error">Error</p>;
    }

    return <ProductsSlider title={title} products={products} />;
  };

  if (isLoadingProductId) {
    return (
      <div className="product-details__loading">
        <Loader />
      </div>
    );
  }

  if (isErrorProductId) {
    return (
      <p className="product-details__error">
        There was an error, please try again later
      </p>
    );
  }

  return (
    <div className="main__product-details product-details">
      <div className="container">
        <div className="product-details__content">
          <NavMap nameProduct={product.name} />

          <ProductDetalisCard product={product} />
        </div>
      </div>

      {getSlider(
        randomProducts,
        'You may also like',
        isLoadingRandomProducts,
        isErrorRandomProducts,
      )}
    </div>
  );
};
