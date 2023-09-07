import '../../styles/pages/HomePage/HomePage.scss';

import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { Banner } from '../../components/Banner';
import { ProductSlider } from '../../components/ProductSlider';

import phonesImg from '../../images/phones-block.png';
import tabletsImg from '../../images/tablets-block.png';
import accessoriesImg from '../../images/accessories-block.png';
import { Product } from '../../types/product';

type Props = {
  products: Product[];
  selected: Product[];
  favourites: Product[];
  onSelectedClick: () => void;
  onFavouritesClick: () => void;
};

export const HomePage: React.FC<Props> = ({
  products,
  selected,
  favourites,
  onSelectedClick,
  onFavouritesClick,
}) => {
  return (
    <>
      <Header />

      <main className="main">
        <Banner />

        <ProductSlider
          title="Hot prices"
          products={products}
          selected={selected}
          favourites={favourites}
          onSelectedClick={onSelectedClick}
          onFavouritesClick={onFavouritesClick}
        />

        <section className="main__category-links">
          <h1 className="main__categories-title">Shop by gategory</h1>

          <div className="main__category-blocks">
            <div className="main__category-block">
              <img
                src={phonesImg}
                alt="phones"
                className="main__category-img main__phones"
              />

              <h3 className="main__category-title">Mobile phones</h3>

              <p className="main__pieces-quantity">95 models</p>
            </div>

            <div className="main__category-block">
              <img
                src={tabletsImg}
                alt="phones"
                className="main__category-img main__tablets"
              />

              <h3 className="main__category-title">Tablets</h3>

              <p className="main__pieces-quantity">40 models</p>
            </div>

            <div className="main__category-block">
              <img
                src={accessoriesImg}
                alt="phones"
                className="main__category-img main__accessories"
              />

              <h3 className="main__category-title">Accessories</h3>

              <p className="main__pieces-quantity">205 models</p>
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

      <Footer />
    </>
  );
};
