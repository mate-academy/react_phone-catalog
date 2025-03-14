// import React from 'react';
import './HomePage.scss';
// import { Slider } from '../Slider/Slider';
import { SliderSwiper } from '../SliderSwiper/SliderSwiper';
import { ShopByCategory } from '../ShopByCategory/ShopByCategory';
import { ProductSlider } from '../ProductCard/ProductCard';
import { useEffect, useState } from 'react';
import { ProductDetails } from '../../types/ProductTypes';
import { fetchAllProducts } from '../../utils/api';
import { Loader } from '../Loader/Loader';
import { NameSlider } from '../../nameslider';
export const HomePage = () => {
  // const [phones, setPhones] = useState<Product[]>([]);
  const [phones, setPhones] = useState<ProductDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // setLoading(true);

    const timeout = setTimeout(() => {
      fetchAllProducts()
        .then(data => {
          // throw new Error('Error');
          // console.log('satrt');
          setPhones(data.filter(dat => dat.category === 'phones'));
          setError(null);
        })
        .catch(() => {
          // console.log('casda');
          setError(
            'Oops, something went wrong, please check your connection🫶💻',
          );
        })
        .finally(() => {
          // console.log('final');
          setLoading(false);
        });
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <main className="main__homepage">
      <h1 className="homepage__title">Welcome to Nice Gadgets store!</h1>
      {loading && (
        <div className="loader-container">
          <Loader />
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
      {!loading && !error && (
        <>
          <SliderSwiper />
          <div className="homepage__product">
            <ProductSlider products={phones} title={NameSlider.Brand} />
          </div>
          <div className="homepage__category">
            <h2 className="category">Shop by category</h2>
            <ShopByCategory />
          </div>
          <div className="homepage__Hotproduct">
            <ProductSlider
              products={phones}
              WithAdditionalPrice={true}
              title={NameSlider.Hot}
            />
          </div>
        </>
      )}
    </main>
  );
};
