import { useEffect, useState } from 'react';
import { Breadcrumbs } from '../Shared/Breadcrumbs/Breadcrumbs';
import { PhonesTitle } from '../Shared/PhonesTitle/Phones-title';
import { Product } from './Product/Product';
import { ProductDescription } from './ProductDescription/Product-description';
import { useLocation, useParams } from 'react-router-dom';
import { HotPrices } from '../HomePage/HotPrices/Hot-prices';
import { Loading } from '../Shared/Loading/Loading';
import { ErrorPage } from '../Shared/ErrorPage/ErrorPage';
import style from './ProductPage.module.scss'

export const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [productScreen, setProductScreen] = useState('');
  const [productRam, setProductRam] = useState('');
  const [productProcessor, setProductProcessor] = useState('');
  const [capacity, setCapacity] = useState([]);
  const [productResolution, setProductResolution] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [productNotFound, setProductNotFound] = useState(false);
  const location = useLocation();

  const loadProduct = () => {
    if (!productId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setProductNotFound(false);

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
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch');
          }
          return response.json();
        })
        .then(data => {
          const product = data.find((item: any) => item.id === productId);
          console.log('Found product:', product);

          if (product) {
            setProductScreen(product.screen);
            setProductRam(product.ram);
            setProductProcessor(product.processor);
            setProductResolution(product.resolution);
            setCapacity(product.capacityAvailable);
            setError(false);
          } else {
            setProductNotFound(true);
          }

          setLoading(false);
        })
        .catch(error => {
          console.error('Error loading product:', error);
          setError(true);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [productId, location.pathname]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage onReload={loadProduct} />;
  }

  if (productNotFound) {
    return (
      <div className={style.notfound}>
        <img className={style.notfound__image} src='./img/product-not-found.png' alt="Not found" />
        <p className={style.notfound__text}>Product not found</p>
      </div>
    );
  }

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
};