import { useEffect, useState } from 'react';
import { Breadcrumbs } from '../Shared/Breadcrumbs/Breadcrumbs';
import { PhonesTitle } from '../CatalogPage/PhonesTitle/Phones-title';
import { Product } from './Product/Product';
import { ProductDescription } from './ProductDescription/Product-description';
import { useLocation, useParams } from 'react-router-dom';
import { HotPrices } from '../HomePage/HotPrices/Hot-prices';


export const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [productScreen, setProductScreen] = useState('');
  const [productRam, setProductRam] = useState('');
  const [productProcessor, setProductProcessor] = useState('');
  const [capacity, setCapacity] = useState([])
  const [productResolution, setProductResolution] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (productId) {
      let url = '';
      if (location.pathname.includes('/phones')) {
        url = './api/phones.json';
      } else if (location.pathname.includes('/tablets')) {
        url = './api/tablets.json';
      } else if (location.pathname.includes('/accessories')) {
        url = './api/accessories.json';
      }

      if (url) {
        fetch(url)
          .then(response => response.json())
          .then(data => {
            const product = data.find((item: any) => item.id === productId);
            console.log('Found product:', product);
            if (product) {
              setProductScreen(product.screen);
              setProductRam(product.ram);
              setProductProcessor(product.processor);
              setProductResolution(product.resolution);
              setCapacity(product.capacityAvailable);
            }
          });
      }
    }
  }, [productId, location.pathname]);

  return (
    <>
      <Breadcrumbs />
      <PhonesTitle />
      <Product
        productScreen={productScreen}
        productRam={productRam}
        productProcessor={productProcessor}
        productResolution={productResolution}
        capacity={capacity}
      />
      <ProductDescription
        productScreen={productScreen}
        productRam={productRam}
        productProcessor={productProcessor}
        capacity={capacity}
        productResolution={productResolution}
      />
      <HotPrices />
    </>
  );
}