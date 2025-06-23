import { ProductTop } from '../../secondary/ProductComponents/ProductTop/ProductTop';
import { ProductDetails } from '../../secondary/ProductComponents/ProductDetails';
import { ProductBottom } from '../../secondary/ProductComponents/ProducBottom';
import { AboutUs } from '../../secondary/ProductComponents/AboutUs/AboutUs';
import { getPhonesData } from '../../../api/PhonesApi';
import { ErrorBlock } from '../../../messageError';
import { Product } from '../../../types/Product';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Spiner } from '../../../spiner';
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
        true;
      });
  }, []);

  useEffect(() => {
    allStore.forEach(store => {
      const product = store?.find(product => product.name === productId);

      if (product) {
        setProduct(product);
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
