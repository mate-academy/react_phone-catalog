/* eslint-disable max-len */
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductsSlider } from '../components/ProductsSlider';
import { Filter } from '../types/filter';
import { ProductsContext } from '../components/ProductsContext';

export const HomePage: React.FC = () => {
  const { products } = useContext(ProductsContext);
  const [banner, setBanner] = useState(1);

  function prev() {
    setBanner(banner === 1 ? 3 : banner - 1);
  }

  function next() {
    setBanner(banner === 3 ? 1 : banner + 1);
  }

  setInterval(next, 5000);

  return (
    <>
      <div className="banner">
        <div className="banner__container">
          <button
            type="button"
            className="banner__slider--button"
            onClick={() => prev()}
          >
            <img src="icons/arrowRight.svg" alt="arrowRight" />
          </button>

          <div className="banner__slider">
            <div className="banner__slider-container">
              <div className={`banner__slider-line banner__slider-line--${banner}`}>
                {[1, 2, 3].map(num => (
                  <div
                    key={num}
                    className={
                      `banner__slider-container--photo banner__slider-container--photo-${num}`
                    }
                    id={`banner${num}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            className="banner__slider--button"
            onClick={() => next()}
          >
            <img src="icons/arrowLeft.svg" alt="arrowLeft" />
          </button>
        </div>

        <div className="banner__slider-buttons">
          <button
            type="button"
            className={banner === 1
              ? 'banner__slider-buttons--dot pressed'
              : 'banner__slider-buttons--dot'}
            aria-label="choose"
            onClick={() => setBanner(1)}
          />

          <button
            type="button"
            className={banner === 2
              ? 'banner__slider-buttons--dot pressed'
              : 'banner__slider-buttons--dot'}
            aria-label="choose"
            onClick={() => setBanner(2)}
          />

          <button
            type="button"
            className={banner === 3
              ? 'banner__slider-buttons--dot pressed'
              : 'banner__slider-buttons--dot'}
            aria-label="choose"
            onClick={() => setBanner(3)}
          />
        </div>
      </div>

      <ProductsSlider filter={Filter.discount} />

      <div className="pageSection">
        <h1 className="pageSection__title">Shop by categories</h1>

        <div className="pageSection__container categories__container">
          <Link className="categories__link" to="/phones">
            <img
              src="img/categories/phones.png"
              alt="categories/phone"
              className="categories__link-img"
            />

            <h3 className="categories__link-title">
              Mobile phones
            </h3>

            <p className="categories__link-subtitle">
              {`${products.filter(p => p.type === 'phone').length} models`}
            </p>
          </Link>
          <Link className="categories__link" to="/tablets">
            <img
              src="img/categories/tablets.png"
              alt="categories/tablets"
              className="categories__link-img"
            />

            <h3 className="categories__link-title">
              Tablets
            </h3>

            <p className="categories__link-subtitle">
              {`${products.filter(p => p.type === 'tablet').length} models`}
            </p>
          </Link>
          <Link className="categories__link" to="/phones">
            <img
              src="img/categories/accesories.png"
              alt="categories/accesories"
              className="categories__link-img"
            />

            <h3 className="categories__link-title">
              Accessories
            </h3>

            <p className="categories__link-subtitle">
              {`${products.filter(p => p.type === 'accessories').length} models`}
            </p>
          </Link>
        </div>
      </div>

      <ProductsSlider filter={Filter.new} />
    </>
  );
};
