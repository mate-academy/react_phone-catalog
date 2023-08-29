import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone } from '../types/Phone';
import { Slider } from '../components/Slider';
import { ProductsSlider } from '../components/ProductsSlider';
import { getPhones } from '../helpers/htmlClient';

export const HomePage = () => {
  const [phones, setPhones] = useState<Phone[]>([]);

  useEffect(() => {
    getPhones()
      .then((res: Phone[]) => {
        setPhones(res);
      });
  }, []);

  return (
    <main className="main">
      <section className="main__slider">
        <Slider />
      </section>

      <section className="main__section">
        <ProductsSlider section="Hot prices" />
      </section>

      <section className="main__section" data-cy="categoryLinksContainer">
        <div className="main__upper-wrapper">
          <h1 className="main__title">Shop by category</h1>
        </div>
        <div className="category">
          <div>
            <Link to="/phones" className="category__item">
              <img
                src="./_new/img/category-phones.png"
                alt="phones"
                className="category__image"
              />
            </Link>
            <Link to="/phones">
              <h3 className="category__title">Mobile phones</h3>
            </Link>
            <p className="category__count">{`${phones.length} models`}</p>
          </div>
          <div>
            <Link to="/tablets" className="category__item">
              <img
                src="./_new/img/category-tablets.png"
                alt="tablets"
                className="category__image"
              />
            </Link>
            <Link to="/tablets">
              <h3 className="category__title">Tablets</h3>
            </Link>
            <p className="category__count">0 models</p>
          </div>
          <div>
            <Link to="/accessories" className="category__item">
              <img
                src="./_new/img/category-accessories.png"
                alt="accessories"
                className="category__image"
              />
            </Link>
            <Link to="/accessories">
              <h3 className="category__title">Accessories</h3>
            </Link>
            <p className="category__count">0 models</p>
          </div>
        </div>
      </section>

      <section className="main__section">
        <ProductsSlider section="Brand new models" />
      </section>
    </main>
  );
};
