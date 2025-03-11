// import React from 'react';
import './HomePage.scss';
// import { Slider } from '../Slider/Slider';
import { SliderSwiper } from '../SliderSwiper/SliderSwiper';
import { ShopByCategory } from '../ShopByCategory/ShopByCategory';
import { ProductSlider } from '../ProductCard/ProductCard';
import { useEffect, useState } from 'react';
import { Product } from '../../types/typeRpoduct';
import { fetchProducts } from '../../utils/api';
import { Loader } from '../Loader/Loader';

export const HomePage = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then(data => {
        setPhones(data.filter(dat => dat.category === 'phones'));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main className="main__homepage">
      <h1 className="homepage__title">Welcome to Nice Gadgets store!</h1>
      {loading && <Loader />}

      {!loading && (
        <>
          <SliderSwiper />

          <div className="homepage__product">
            <ProductSlider products={phones} />
          </div>

          <div className="homepage__category">
            <h2 className="category">Shop by category</h2>
            <ShopByCategory />
          </div>

          <div className="homepage__Hotproduct">
            <ProductSlider products={phones} WithAdditionalPrice={true} />
          </div>
        </>
      )}
    </main>
  );
};
