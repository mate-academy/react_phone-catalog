// import React from 'react';
import './HomePage.scss';
// import { Slider } from '../Slider/Slider';
import { SliderSwiper } from '../SliderSwiper/SliderSwiper';
import { ShopByCategory } from '../ShopByCategory/ShopByCategory';
import { ProductSlider } from '../ProductCard/ProductCard';
import { useEffect, useState } from 'react';
import { Product, ProductDetails } from '../../types/ProductTypes';
import { fetchAllProducts, fetchProducts } from '../../utils/api';
import { Loader } from '../Loader/Loader';
import { NameSlider } from '../../nameslider';
import catGif from '../../../assets/cat.gif';
export const HomePage = () => {
  // const [phones, setPhones] = useState<Product[]>([]);
  const [phones, setPhones] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts();

        setPhones(
          data.filter((product: Product) => product.category === 'phones'),
        );
        setError(null);
      } catch (err: any) {
        if (err.message === 'No internet connection') {
          setError('No internet connection. Please check your network.');
        } else {
          setError('Server is not responding. Please try again later.');
        }
        // window.alert(
        //   `Oops, something went wrong, please check your connection 🫶💻`,
        // );
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(fetchData, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <main className="main__homepage">
      {error && (
        <div className="error__container">
          <img src={catGif} alt="Error" className="error__img" />
          <p className="error-message">
            Oops, something went wrong, please check your connection 🫶💻. Try
            again later ❤️.
          </p>
        </div>
      )}
      {!error && (
        <h1 className="page__title">Welcome to Nice Gadgets store!</h1>
      )}

      {loading && (
        <div className="loader-container">
          <Loader />
        </div>
      )}

      {!loading && !error && (
        <>
          <SliderSwiper />
          <div className="homepage__product">
            <ProductSlider products={phones} title={NameSlider.Brand} />
          </div>
          <div className="homepage__category">
            <h2 className="category__title">Shop by category</h2>
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
