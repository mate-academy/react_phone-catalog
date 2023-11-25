import './HomePage.scss';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { Carousel } from '../../components/Carousel/Carousel';
import { ProductSlider } from '../../components/ProductsSlider/ProductsSlider';

import { calculateDiscount } from '../../helpers/calculateDiscount';
import { getProductsCount } from '../../helpers/getProductsCount';
import { useGetProductsQuery } from '../../features/api/apiSlice';
import { Loader } from '../../components/Loader';

import phones from '../../images/category-phones.png';
import tablets from '../../images/category-tablets.png';
import accessories from '../../images/category-accessories.png';

export const HomePage = () => {
  const { data: products = [], isLoading } = useGetProductsQuery();

  const hotPriceProducts = useMemo(() => {
    return products.filter(product => product.discount !== 0)
      .sort((a, b) => calculateDiscount(a) - calculateDiscount(b));
  }, [products]);

  const brandNewProducts = useMemo(() => {
    return products.filter(product => !product.discount)
      .sort((a, b) => b.price - a.price);
  }, [products]);

  const phonesCount = useMemo(() => {
    return getProductsCount(products, 'phone');
  }, [products]);

  const tabletsCount = useMemo(() => {
    return getProductsCount(products, 'tablet');
  }, [products]);

  const accessoriesCount = useMemo(() => {
    return getProductsCount(products, 'accessory');
  }, [products]);

  return (
    <div className="HomePage container">
      {isLoading && (
        <div className="HomePage__loader">
          <Loader />
        </div>
      )}

      {!isLoading && (
        <>
          <div className="HomePage__carousel-container">
            <Carousel />
          </div>

          <section className="section">
            <h2 className="section__title">
              Hot prices
            </h2>

            <ProductSlider
              products={hotPriceProducts}
            />
          </section>

          <section className="HomePage__shop-by-category section">
            <h2 className="section__title">
              Shop by category
            </h2>

            <ul
              className="HomePage__shop-by-category-container"
              data-cy="categoryLinksContainer"
            >
              <li>
                <Link
                  to="/phones"
                  className="HomePage__shop-by-category-link"
                >
                  <img
                    src={phones}
                    alt="phones"
                  />
                  <h3>
                    Mobile phones
                  </h3>
                </Link>

                <p>
                  {`${phonesCount} models`}
                </p>
              </li>
              <li>
                <Link
                  to="/tablets"
                  className="HomePage__shop-by-category-link"
                >
                  <img
                    src={tablets}
                    alt="tablets"
                  />
                  <h3>
                    Tablets
                  </h3>
                </Link>

                <p>
                  {`${tabletsCount} models`}
                </p>
              </li>
              <li>
                <Link
                  to="/accessories"
                  className="HomePage__shop-by-category-link"
                >
                  <img
                    src={accessories}
                    alt="accessories"
                  />
                  <h3>
                    Accessories
                  </h3>
                </Link>

                <p>
                  {`${accessoriesCount} models`}
                </p>
              </li>
            </ul>
          </section>

          <section className="HomePage__brand-new section">
            <h2 className="section__title">
              Brand new models
            </h2>

            <ProductSlider
              products={brandNewProducts}
            />
          </section>
        </>
      )}
    </div>
  );
};
