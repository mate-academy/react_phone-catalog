import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ProductDetails } from '../../components/Content/ProductDetails';
import { Breadcrumb } from '../../components/Content/Breadcrumb';

import { Products } from '../../type/Productes';
import { fetchDetails, getProducts } from '../../api';
import { Details } from '../../type/Details';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProdukt] = useState<Products>();
  const [details, setDetails] = useState<Details | undefined>();

  useEffect(() => {
    if (!productId) {
      return;
    }

    getProducts().then(data => {
      setProdukt(data.find(d => String(d.itemId) === productId.slice(1)));
    });
  }, [productId]);

  const pathFunc = () => {
    switch (product?.category) {
      case 'phones':
        return ['Phones', product.name];
      case 'tablets':
        return ['Tablets', product.name];
      case 'accessories':
        return ['Accessories', product.name];
      default:
        return [];
    }
  };

  const path = pathFunc();
  const backUrl = path.length > 0 ? path[0].toLowerCase() : '/';

  useEffect(() => {
    if (!product?.category) {
      return;
    }

    fetchDetails(product?.category, product?.itemId).then(data =>
      setDetails(data[0]),
    );
  }, [product]);

  return (
    <>
      <Breadcrumb path={path} />
      <ProductDetails backUrl={backUrl} details={details} />
    </>
  );
};
