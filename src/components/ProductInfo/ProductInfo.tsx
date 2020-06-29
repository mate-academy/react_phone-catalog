import React from 'react';
import './ProductInfo.scss';
import { PRODUCTS_INFO } from '../../helpers/config';
import { techInfo } from '../../helpers/techInfo';

type ProductInfo = {
  productInfo: Product;
  productDetails: ProdactDetails;
};

const ProductInfo: React.FC<ProductInfo> = ({ productInfo, productDetails }) => (
  <section className="Info">
    <ul className="Info__List">
      {PRODUCTS_INFO.map(item => (
        <li
          className="Info__Item"
          key={item.name}
        >
          <p className="Info__Title">
            {item.name}
          </p>
          <p className="Info__Feature">
            {productInfo
              && techInfo(productInfo, productDetails, item.name, item.order)}
          </p>
        </li>
      ))}
    </ul>
  </section>
);

export default ProductInfo;
