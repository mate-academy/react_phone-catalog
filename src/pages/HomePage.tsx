import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Slider } from '../components/Slider';
import { ProductsSlider } from '../components/ProductsSlider';
import phone from '../image/Phones.png';
import tablet from '../image/tablet.png';
import accessorie from '../image/acse.png';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { init as initPhones } from '../features/phones';

export const HomePage = () => {
  const { phones } = useAppSelector(state => state.phones);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initPhones());
  }, []);// eslint-disable-line

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
                src={phone}
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
                src={tablet}
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
                src={accessorie}
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
