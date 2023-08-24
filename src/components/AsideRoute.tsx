import React from 'react';
import { HouseIcon, IconSlideRight } from '../utils/Icons';
import { Product } from '../types/Phone';
import { ProductType } from '../api/getProducts';

interface Props {
  // pageTitle: string;
  productName?: string;
  product: Product;
}

const AsideRoute: React.FC<Props> = ({ product, productName }) => {
  const pageTitle = product.type !== ProductType.ACCESSORY ? `${product.type[0].toUpperCase() + product.type.slice(1)}s` : 'Accessories';

  return (
    <div className="aside-route">
      <HouseIcon />
      <IconSlideRight />
      <p className="aside-route__page-title">{pageTitle}</p>
      {productName
      && (
        <>
          <IconSlideRight />
          <p className="aside-route__product-name">{productName}</p>
        </>
      )}
    </div>
  );
};

export default AsideRoute;
