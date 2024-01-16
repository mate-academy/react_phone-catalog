import { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Loader } from '../../components/Loader/Loader';
import { calculateDiscount } from '../../helpers/calculateDiscount';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import './HomePage.scss';
import { getProductCount } from '../../helpers/getProductCount';
import { Carousel } from '../../components/Carousel/Carousel';
import { ProductContext } from '../../context/ProductContext';

export const HomePage = () => {
  const { products, isLoading } = useContext(ProductContext);

  const hotPriceProducts = useMemo(() => {
    return products
      .filter(product => product.discount !== 0)
      .sort((a, b) => calculateDiscount(a) - calculateDiscount(b));
  }, [products]);

  const brandNewProducts = useMemo(() => {
    return products
      .filter(product => !product.discount)
      .sort((a, b) => b.price - a.price);
  }, [products]);

  const phonesCount = useMemo(() => {
    return getProductCount(products, 'phones');
  }, [products]);

  const tabletsCount = useMemo(() => {
    return getProductCount(products, 'tablets');
  }, [products]);

  const accessoriesCount = useMemo(() => {
    return getProductCount(products, 'accessories');
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
          <h1 className="HomePage__carousel-container section">
            <Carousel />
          </h1>

          <section className="section">
            <ProductSlider
              products={hotPriceProducts}
              title="Hot prices"
            />
          </section>

          <section className="HomePage__shop-by-category section">
            <h2 className="section__title HomePage__shop-by-category__title">
              Shop by category
            </h2>

            <ul
              className="HomePage__shop-by-category__container"
              data-cy="categoryLinksContainer"
            >
              <li>
                <Link
                  to="/phones"
                  className="HomePage__shop-by-category-link"
                >
                  <img
                    src="img/banners/category-phones.png"
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
                    src="img/banners/category-tablets.png"
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
                    src="img/banners/category-accessories.png"
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

          <section className="section">
            <ProductSlider
              products={brandNewProducts}
              title="Brand new models"
            />
          </section>
        </>
      )}
    </div>
  );
};
