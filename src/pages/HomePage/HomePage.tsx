import '../../styles/pages/HomePage/HomePage.scss';

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Banner } from '../../components/Banner';
import { ProductSlider } from '../../components/ProductSlider';
import phonesImg from '../../images/phones-block.png';
import tabletsImg from '../../images/tablets-block.png';
import accessoriesImg from '../../images/accessories-block.png';
import { Product } from '../../types/product';
import { productApi } from '../../utils/api/productApi';
import { Loader } from '../../components/Loader';
import { SortBy, productService } from '../../utils/productService';
import { Item } from '../../types/storageItem';

type Props = {
  isIncluded: (items: Item<Product>[], value: Product) => boolean;
  cart: Item<Product>[];
  fav: Item<Product>[];
  onSelectedClick: (value: Product) => void;
  onFavClick: (value: Product) => void;
};

export const HomePage: React.FC<Props> = ({
  cart,
  fav,
  isIncluded,
  onSelectedClick,
  onFavClick,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    productApi.getAll
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, []);

  const hotPricesProducts = productService
    .sortProducts(products, SortBy.DISCOUNT)
    .slice(0, 12);

  const newProducts = productService
    .sortProducts(products, SortBy.AGE, true)
    .slice(0, 12);

  return (
    <main className="home-page">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Banner />

          <ProductSlider
            title="Hot prices"
            products={hotPricesProducts}
            cart={cart}
            fav={fav}
            isIncluded={isIncluded}
            onFavClick={onFavClick}
            onSelectedClick={onSelectedClick}
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
            products={newProducts}
            cart={cart}
            fav={fav}
            isIncluded={isIncluded}
            onFavClick={onFavClick}
            onSelectedClick={onSelectedClick}
          />
        </>
      )}
    </main>
  );
};
