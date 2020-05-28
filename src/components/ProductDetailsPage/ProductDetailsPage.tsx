import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import './ProductDetailsPage.scss';

import { getProducts } from '../../helpers/api';

type Props = RouteComponentProps<{
  productId: string;
}>;

export const ProductDetailsPage: React.FC<Props> = ({ match }) => {
  const [products, setProducts] = useState<Slide[]>([]);
  const { productId } = match.params;

  useEffect(() => {
    getProducts().then(data => setProducts(data));
  }, []);


  return (
    <div className="ProductDetailsPage">
      <h1>
        {productId}
        {products}
      </h1>
    </div>
  );
};
