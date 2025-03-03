// import React from 'react';
import './HomePage.scss';
// import { Slider } from '../Slider/Slider';
import { SliderSwiper } from '../SliderSwiper/SliderSwiper';
import { ShopByCategory } from '../ShopByCategory/ShopByCategory';
import { ProductCard } from '../ProductCard/ProductCard';
import { useEffect, useState } from 'react';
import { Product } from '../../types/typeRpoduct';
import { fetchProducts } from '../../utils/api';
// import { Footer } from '../Footer/Footer';

export const HomePage = () => {
  const [phones, setPhones] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts().then(data => {
      setPhones(data.filter(dat => dat.category === 'phones'));
    });
  }, []);

  return (
    <main className="main__homepage">
      <h1 className="homepage__title">Welcome to Nice Gadgets store!</h1>
      {/* <Slider /> */}
      <SliderSwiper />

      <div className="homepage__product">
        <ProductCard products={phones} />
      </div>

      <div className="homepage__category">
        <h2 className="category">Shop by category</h2>
        <ShopByCategory />
      </div>

      <div className="homepage__Hotproduct">
        <ProductCard products={phones} WithAdditionalPrice={true} />
      </div>

      {/* <div className="homepage__Footer">
        <Footer />
      </div> */}
    </main>
  );
};
