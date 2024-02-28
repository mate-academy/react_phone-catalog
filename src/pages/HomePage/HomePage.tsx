import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { HomePageTopSlider } from '../../components/TopSlider';
import { getBrandNewProducts, getHotPriceProducts } from '../../helpers/api';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { Product } from '../../types/Product';
import { IMAGES } from '../../images-style/images';

type HomePageProps = {
  setFavLength: React.Dispatch<number>,
  setCartLength: React.Dispatch<number>,
};

export const HomePage: React.FC<HomePageProps> = ({
  setFavLength,
  setCartLength,
}) => {
  const [hotPrice, setHotPrice] = useState([]);
  const [brandNew, setBrandNew] = useState([]);

  useEffect(() => {
    getHotPriceProducts()
      .then(setHotPrice);

    getBrandNewProducts()
      .then(setBrandNew);
  }, []);

  const GetCategoryQuantity = (filterCategory: string) => {
    return hotPrice
      .filter((good: Product) => good.category === filterCategory).length;
  };

  return (
    <>
      <HomePageTopSlider />
      {hotPrice && (
        <ProductsSlider
          goods={hotPrice}
          name="Hot Prices"
          setFavLength={setFavLength}
          setCartLength={setCartLength}
          useDiscount
          extraClass="product-slider--top-margin"
        />
      )}
      <div
        className="main__shop-by-category"
        data-cy="categoryLinksContainer"
      >
        <div className="main__shop-by-category-title">Shop by category</div>

        <div className="main__shop-by-category-links">
          <Link to="/phones" className="main__shop-by-category-link">
            <div
              className={classNames('main__shop-by-category-link-container',
                'main__shop-by-category-link-container-1')}
            >
              <img
                src={IMAGES['category-phones']}
                alt="phones-category"
                className={classNames('main__shop-by-category-link-photo',
                  'main__shop-by-category-link-photo-1')}
              />
            </div>
            <span className="main__shop-by-category-link-text">
              Mobile phones
            </span>
            <span className="main__shop-by-category-link-number">
              {`${GetCategoryQuantity('phones')} models`}
            </span>
          </Link>

          <Link to="/tablets" className="main__shop-by-category-link">
            <div
              className={classNames('main__shop-by-category-link-container',
                'main__shop-by-category-link-container-2')}
            >
              <img
                src={IMAGES['category-tablets']}
                alt="tablets-category"
                className={classNames('main__shop-by-category-link-photo',
                  'main__shop-by-category-link-photo-2')}
              />
            </div>
            <span className="main__shop-by-category-link-text">Tablets</span>
            <span className="main__shop-by-category-link-number">
              {`${GetCategoryQuantity('tablets')} models`}
            </span>
          </Link>

          <Link to="/accessories" className="main__shop-by-category-link">
            <div
              className={classNames('main__shop-by-category-link-container',
                'main__shop-by-category-link-container-3')}
            >
              <img
                src={IMAGES['category-accessories']}
                alt="accessories-category"
                className={classNames('main__shop-by-category-link-photo',
                  'main__shop-by-category-link-photo-3')}
              />
            </div>
            <span className="main__shop-by-category-link-text">
              Accessories
            </span>
            <span className="main__shop-by-category-link-number">
              {`${GetCategoryQuantity('accessories')} models`}
            </span>
          </Link>
        </div>
      </div>
      {brandNew && (
        <ProductsSlider
          goods={brandNew}
          name="Brand new"
          setFavLength={setFavLength}
          setCartLength={setCartLength}
        />
      )}
    </>
  );
};
