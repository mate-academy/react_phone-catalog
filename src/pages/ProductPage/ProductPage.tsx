import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDetails } from '../../api/getProducts';
import { ProductDetail } from '../../types/ProductDetails';
import styles from './ProductPage.module.scss';

import { ShowLocation } from '../../components/ShowLocation';
import { Gallery } from '../../components/Gallery';
import { Order } from '../../components/Order';

export const ProductPage = () => {
  const { product } = useParams();
  const [currentProduct, setCurrentProduct] = useState<ProductDetail>();

  useEffect(() => {
    if (product) {
      getDetails(product).then(setCurrentProduct);
    }
  }, [product]);

  return (
    <>
      <ShowLocation />
      {currentProduct && (
        <>
          <h1>{currentProduct.name}</h1>
          <div className={styles.intro}>
            <Gallery currentProduct={currentProduct} />
            <Order currentProduct={currentProduct} />
          </div>
        </>
      )}
    </>
  );
};
