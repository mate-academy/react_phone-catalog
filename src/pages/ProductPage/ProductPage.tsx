
import React, { useState, useEffect } from 'react';
import { getDetails } from '../../helpers/api';
import {ProductDetails} from '../../interfaces';

export const ProductPage = ({productId}:{productId:string}) => {
const [productDetailsFromServer, setProductDetailsFromServer] = useState<ProductDetails>();

  useEffect(
    () => {
      getDetails(productId)
      .then((productDetails) => {
        setProductDetailsFromServer(productDetails)
      });
    }, []
  )
  return (
    <>
<h1>{productId}</h1>
  <p>{JSON.stringify(productDetailsFromServer)}</p>
</>
  )
}
