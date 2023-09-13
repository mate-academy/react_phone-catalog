import '../../styles/pages/HomePage/HomePage.scss';

import { Link } from 'react-router-dom';
import { Banner } from '../../components/Banner';
import { ProductSlider } from '../../components/ProductSlider';

import phonesImg from '../../images/phones-block.png';
import tabletsImg from '../../images/tablets-block.png';
import accessoriesImg from '../../images/accessories-block.png';
import { getProducts } from '../../utils/product-mocks';

export const HomePage: React.FC = () => {
  const products = getProducts(10);
  const selected = products.slice(3, 6);
  const favourites = products.slice(1, 2);

  const onSelectedClick = () => {

  };

  const onFavouritesClick = () => {

  };

  return (
    <main className="home-page">
      <Banner />

      <ProductSlider
        title="Hot prices"
        products={products}
        selected={selected}
        favourites={favourites}
        onSelectedClick={onSelectedClick}
        onFavouritesClick={onFavouritesClick}
      />

      <section className="home-page__category-links">
        <h1 className="home-page__categories-title">Shop by gategory</h1>

        <div className="home-page__category-blocks">
          <div className="home-page__category-block">
            <Link to="/phones">
              <img
                src={phonesImg}
                alt="phones"
                className="home-page__category-img home-page__phones"
              />
            </Link>

            <h3 className="home-page__category-title">Mobile phones</h3>

            <p className="home-page__pieces-quantity">95 models</p>
          </div>

          <div className="home-page__category-block">
            <Link to="tablets">
              <img
                src={tabletsImg}
                alt="phones"
                className="home-page__category-img home-page__tablets"
              />
            </Link>

            <h3 className="home-page__category-title">Tablets</h3>

            <p className="home-page__pieces-quantity">40 models</p>
          </div>

          <div className="home-page__category-block">
            <Link to="/accessories">
              <img
                src={accessoriesImg}
                alt="phones"
                className="home-page__category-img home-page__accessories"
              />
            </Link>

            <h3 className="home-page__category-title">Accessories</h3>

            <p className="home-page__pieces-quantity">205 models</p>
          </div>
        </div>
      </section>

      <ProductSlider
        title="Brand new models"
        products={products}
        selected={selected}
        favourites={favourites}
        onSelectedClick={onSelectedClick}
        onFavouritesClick={onFavouritesClick}
      />
    </main>
  );
};
