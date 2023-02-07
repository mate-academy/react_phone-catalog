import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct, getProducts } from '../../helpers/api';
import { Product } from '../../types/Product';
import { ProductDetails } from '../../components/ProductDetails/ProductDetails';
import { Loader } from '../../components/Loader/Loader';
import { Error } from '../../components/Error/Error';

export const ProductPage: React.FC = () => {
  const { productId } = useParams();
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [productDetails, setProductDetails] = useState<string | null>(null);
  const [suggestedProducts, setSuggestedProducts]
    = useState<Product[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getSuggestedProducts = (products: Product[]) => {
    const indexes: number[] = [];
    const randomProducts = [];

    while (indexes.length < 10) {
      const randomIndex = Math.floor(Math.random() * products.length);

      if (!indexes.includes(randomIndex)) {
        indexes.push(randomIndex);
        const randomProduct = products[randomIndex];

        randomProducts.push(randomProduct);
      }
    }

    setSuggestedProducts(randomProducts);
  };

  const loadInfo = async () => {
    try {
      if (productId) {
        const [products, details] = await Promise.all([
          getProducts(),
          getProduct(productId),
        ]);

        getSuggestedProducts(products);

        const selectedProduct
          = products.find(product => product.id === productId) || null;

        setCurrentProduct(selectedProduct);
        setProductDetails(JSON.stringify(details));
        getSuggestedProducts(products);
      }
    } catch {
      setError('Something went wrong');
    }
  };

  useEffect(() => {
    loadInfo();
  }, []);

  if (error) {
    return <Error text={error} />;
  }

  return (
    <>
      {(currentProduct && productDetails && suggestedProducts) ? (
        <ProductDetails
          product={currentProduct}
          productDetails={productDetails}
          suggestedProducts={suggestedProducts}
        />
      ) : (
        <Loader />
      )}
    </>
  );
};
