/* eslint-disable max-len */

import { ProductTop } from '../../secondary/ProductComponents/ProductTop/ProductTop';
import { ProductDetails } from '../../secondary/ProductComponents/ProductDetails';
import { ProductBottom } from '../../secondary/ProductComponents/ProducBottom';
import { AboutUs } from '../../secondary/ProductComponents/AboutUs/AboutUs';
import { getPhonesData } from '../../../api/ProductApi';
import { ErrorBlock } from '../../secondary/messageError';
import { Product } from '../../../types/Product';
import { Spiner } from '../../secondary/spiner';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Product.scss';

export const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [hasError, SetHasError] = useState<boolean>(false);
  const [allStore, SetAllStore] = useState<Product[][]>([]);

  useEffect(() => {
    const phones = getPhonesData('phones.json');
    const accessories = getPhonesData('accessories.json');
    const tablets = getPhonesData('tablets.json');

    Promise.all([tablets, accessories, phones])
      .then(response => {
        SetAllStore(response);
      })
      .catch(() => {
        SetHasError(true);
      });
  }, []);

  useEffect(() => {
    allStore.forEach(store => {
      const foundProduct = store?.find(product => product.name === productId);

      if (foundProduct) {
        setProduct(foundProduct);
      }
    });
  }, [productId, allStore]);

  if (!product) {
    return <Spiner />;
  }

  return (
    <>
      {hasError ? (
        <ErrorBlock />
      ) : (
        <div className="product">
          <ProductTop product={product} />

          <ProductDetails product={product} />

          <AboutUs product={product} />

          <ProductBottom allStore={allStore} product={product} />
        </div>
      )}
    </>
  );
};
