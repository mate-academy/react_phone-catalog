import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Product } from '../../../Types/Product';
import { Banner } from '../../Banner/Banner';
import { ProductSlider } from '../../ProductSlider/ProductSlider';
import './home.scss';

import {
  getHotPriceProducts,
  getProducts,
  getNewProducts,
} from '../../../api/request';

import phonesImg from '../../../img/home/phones.png';
import tabletsImg from '../../../img/home/tablets.png';
import accessoriesImg from '../../../img/home/accessories.png';

export const Home = () => {
  const [hotProducts, setHotProducts] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [numberPhones, setnumberPhones] = useState(0);
  const [numberTablets, setnumberTablets] = useState(0);
  const [numberAccessories, setnumberAccessories] = useState(0);

  useEffect(() => {
    getHotPriceProducts().then((response: Product[]) => {
      setHotProducts(response);
    });

    getNewProducts().then((response: Product[]) => {
      setNewProducts(response);
    });

    getProducts('phones').then((response: Product[]) => {
      setnumberPhones(response.length);
    });

    getProducts('tablets').then((response: Product[]) => {
      setnumberTablets(response.length);
    });

    getProducts('accessories').then((response: Product[]) => {
      setnumberAccessories(response.length);
    });
  }, []);

  return (
    <div className="home">
      <Banner />

      <section className="home__hot-prices">
        <ProductSlider products={hotProducts} title="Hot Prices" />
      </section>

      <section className="home__categories">
        <h2 className="home__categories-title">Shop by category</h2>

        <div className="home__wrapper-categories">
          <NavLink to="/phones" className="home__link-category">
            <img
              className="home__img-category"
              src={phonesImg}
              alt="phonesCategory"
            />
            <h3 className="home__subtitle">Mobile phones</h3>
            <span className="home__numberOfItems">{numberPhones} models</span>
          </NavLink>

          <NavLink to="/tablets" className="home__link-category">
            <img
              className="home__img-category"
              src={tabletsImg}
              alt="phonesCategory"
            />
            <h3 className="home__subtitle">Tablets</h3>
            <span className="home__numberOfItems">{numberTablets} models</span>
          </NavLink>

          <NavLink to="/accessories" className="home__link-category">
            <img
              className="home__img-category"
              src={accessoriesImg}
              alt="phonesCategory"
            />
            <h3 className="home__subtitle">Accessories</h3>
            <span className="home__numberOfItems">
              {numberAccessories} models
            </span>
          </NavLink>
        </div>
      </section>

      <section className="home__hot-prices" style={{ marginBottom: '40px' }}>
        <ProductSlider products={newProducts} title="Brand new models" />
      </section>
    </div>
  );
};
