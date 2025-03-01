import React from 'react';
import { useParams } from 'react-router-dom';
import { ProductInfo } from '../components/Main/ProductInfo/ProductInfo';
import products from '../api/products.json';
import { CombinedProduct } from '../types/Product';

const MainProduct: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const getProductByItemId = (itemId: string): CombinedProduct | undefined => {
    return products.find(product => product.itemId === itemId) as CombinedProduct | undefined;
  };

  if (!itemId) {
    return <div>Product not found</div>;
  }

  const product = getProductByItemId(itemId);

  if (!product) {
    return <div>Product not found</div>;
  }

  const showFullPrice = true;

  return (
    <div>
      <ProductInfo product={product} showFullPrice={showFullPrice} />
    </div>
  );
};

export default MainProduct;
