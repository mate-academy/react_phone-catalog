/* eslint-disable consistent-return */
/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductsSlider } from '../components/ProductsSlider';

import phones from '../icons/Phones.jpg';
import tablets from '../icons/Tablets.jpg';
import accessories from '../icons/Accessories.jpg';
import { Phone } from '../types/phone';
import { Slider } from '../components/Slider';

export const Home: React.FC = () => {
  const [hotPricesPhones, setHotPricesPhones] = useState<Phone[]>([]);
  const [brandNewPhones, setBrandNewPhones] = useState<Phone[]>([]);

  const getData = (): Promise<Phone[] | void> => {
    return fetch('https://mate-academy.github.io/react_phone-catalog/_new/products.json')
      .then((response) => {
        if (!response.ok) {
          return;
        }

        return response.json();
      });
  };

  const getHotPriceProducts = () => {
    getData()
      .then((data: void | Phone[]) => {
        if (data) {
          data.sort((a: Phone, b: Phone) => (a.fullPrice - a.price) - (b.fullPrice - b.price));
          setHotPricesPhones(data);
        }
      });
  };

  const getBrandNewProducts = () => {
    getData()
      .then((data: Phone[] | void) => {
        if (data) {
          const filteredProducts = data.filter((product: Phone) => product.year >= 2019);

          setBrandNewPhones(filteredProducts);
        }
      });
  };

  useEffect(() => {
    getHotPriceProducts();
    getBrandNewProducts();
  }, []);

  return (
    <>
      <Slider />
      <div className="hot-prices">
        <ProductsSlider hotPricesPhones={hotPricesPhones} />
      </div>

      <div className="shop-by-category">
        <h1 className="shop-by-category__title">Shop by category</h1>

        <div className="shop-by-category__container" data-cy="categoryLinksContainer">
          <Link to="/phones" className="shop-by-category__link">
            <img src={phones} className="phones" alt="phones" />
            <h3 className="shop-by-category__text">Mobile Phones</h3>
            <p className="shop-by-category__models">71 models</p>
          </Link>

          <Link to="/tablets" className="shop-by-category__link">
            <img src={tablets} className="tablets" alt="tablets" />
            <h3 className="shop-by-category__text">Tablets</h3>
            <p className="shop-by-category__models">0 models</p>
          </Link>

          <Link to="accessories" className="shop-by-category__link">
            <img src={accessories} className="accessories" alt="accessories" />
            <h3 className="shop-by-category__text"> Accessories</h3>
            <p className="shop-by-category__models">0 models</p>
          </Link>
        </div>
      </div>

      <div className="brand-new">
        <ProductsSlider brandNewPhones={brandNewPhones} />
      </div>
    </>
  );
};
