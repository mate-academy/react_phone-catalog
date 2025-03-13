// import React from 'react';
import './HomePage.scss';
// import { Slider } from '../Slider/Slider';
import { SliderSwiper } from '../SliderSwiper/SliderSwiper';
import { ShopByCategory } from '../ShopByCategory/ShopByCategory';
import { ProductSlider } from '../ProductCard/ProductCard';
import { useEffect, useState } from 'react';
import { ProductDetails } from '../../types/ProductDetails';
import { fetchAllProducts } from '../../utils/api';
import { Loader } from '../Loader/Loader';
import { NameSlider } from '../../nameslider';
export const HomePage = () => {
  // const [phones, setPhones] = useState<Product[]>([]);
  const [phones, setPhones] = useState<ProductDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchAllProducts()
      .then(data => {
        setPhones(data.filter(dat => dat.category === 'phones'));
      })
      // .catch(error => {
      //   console.error('Error fetching products:', error);
      // })
      .finally(() => {
        setTimeout(() => setLoading(false), 500);
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
