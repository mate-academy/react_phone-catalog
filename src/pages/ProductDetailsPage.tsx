import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { fetchProductDetails } from '../common/helpers/api';

export const ProductDetailsPage = () => {
  const match: Match = useRouteMatch();
  const [productDetails, setProductDetails] = useState<ProductDetails | {}>({});

  const getDetails = async (productId: string) => {
    const details = await fetchProductDetails(productId);
    setProductDetails(details)
  }

  useEffect(() => {
    getDetails(match.params.productId);
  }, [match]);

  return (
    console.log(productDetails),
    <div>
      <h5>HI</h5>
    </div>
  )
}
