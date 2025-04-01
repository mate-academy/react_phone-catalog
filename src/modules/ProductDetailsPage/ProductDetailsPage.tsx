/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../shared/components/Loader';
import { useProduct } from '../../store/ProductContext';
import { ProductDetails } from './components/ProductDetails/ProductDetails';
import { DetailedType } from '../shared/types/DetailedType';
import { ProductNotFound } from './components/ProductNotFound';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();

  const [detailedProduct, setDetailedProduct] = useState<DetailedType>();
  const [isLoading, setIsLoading] = useState(true);
  const { products } = useProduct();
  const product = products.find(p => p.itemId.toString() === productId);

  const fetchProduct = async () => {
    setIsLoading(true);
    const selectedProduct = products.find(
      p => p.itemId.toString() === productId,
    );

    if (!selectedProduct) {
      setIsLoading(false);
    }

    try {
      const response = await fetch(`./api/${selectedProduct?.category}.json`);

      if (!response.ok) {
        throw new Error('Something went wrong. Please try again.');
      }

      const data: DetailedType[] = await response.json();

      setDetailedProduct(
        data.find((p: DetailedType) => {
          if (p) {
            return p.id.toString() === productId;
          }

          return undefined;
        }),
      );
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId, products]);

  if (isLoading) {
    return <Loader />;
  }

  if (!detailedProduct) {
    return (
      <section className="App__section" id="cart">
        <div className="App__section-content App__section-content">
          <ProductNotFound />
        </div>
      </section>
    );
  }

  return (
    <section className="App__section" id="cart">
      <div className="App__section-content App__section-content">
        <ProductDetails
          detailedProduct={detailedProduct}
          product={product}
          products={products}
        />
      </div>
    </section>
  );
};
