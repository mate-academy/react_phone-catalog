import React, { useState, useEffect } from 'react';
import ProductsSlider from '../ProductsSlider/ProductsSlider';
import MainSlider from '../MainSlider/MainSlider';
import { ShopByCategory } from '../ShopByCategory/ShopByCategory';
import { getProducts } from '../../helpers/api';

export const Home: React.FC = () => {
  const [data, setData] = useState<Slide[]>([]);
  const [hotProducts, setHotProducts] = useState<Slide[]>([]);
  const [brandProducts, setBrandProducts] = useState<Slide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    const loadData = async () => {
      try {
        const loadedProduct = await getProducts();

        setData(loadedProduct);
        setIsLoaded(true);
      } catch (error) {
        setErrorMessage('Oops! Reload page, please');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    setHotProducts(data.filter((product: Slide) => product.discount > 0)
      .sort((a: Slide, b: Slide) => a.discount - b.discount));
  }, [data]);

  useEffect(() => {
    setBrandProducts(data
      .filter((product: Slide) => product.discount === 0)
      .sort((a: Slide, b: Slide) => a.discount - b.discount));
  }, [data]);

  return (
    <>
      {errorMessage && <div>{errorMessage}</div>}
      {isLoading
        && (
          <div className="Loading">
            Loading...
          </div>
        )}
      {isLoaded && (
        <>
          <MainSlider />
          <ProductsSlider title="Hot prices" visibleProducts={hotProducts} />
          <ShopByCategory />
          <ProductsSlider title="Brand new models" visibleProducts={brandProducts} />
        </>
      )}
    </>
  );
};
