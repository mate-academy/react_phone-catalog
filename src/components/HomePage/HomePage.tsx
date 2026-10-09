import { Banner } from '../Banner/Banner';
import productsData from '../../../public/api/products.json';
import { Product } from '../../types/Product';
import { ProductsSlider } from '../Shared/Slider/ProductsSlider';
import { Link } from 'react-router-dom';

export const Body = () => {
  const products: Product[] = productsData;

  const productPhone = products.filter(
    product => product.category === 'phones',
  );

  const productTablets = products.filter(
    product => product.category === 'tablets',
  );

  const productAccessories = products.filter(
    product => product.category === 'accessories',
  );

  const maxYear = Math.max(...products.map(product => product.year));
  const newProducts = products
    .filter(product => product.year === maxYear)
    .slice(0, 10);

  const discountProducts = products
    .filter(product => product.fullPrice > product.price)
    .sort((a, b) => {
      const discountA = a.fullPrice - a.price;
      const discountB = b.fullPrice - b.price;

      return discountB - discountA;
    })
    .slice(0, 10);

  return (
    <>
      <main className="main">
        <div className="container">
          <div className="main__content">
            <h1 className="hide">Product Catalog</h1>

            <Banner />
            <ProductsSlider
              newProducts={newProducts}
              title="Brand new models"
              hasDiscount={false}
            />
            <section className="shop-by-category">
              <h2 className="shop-by-category__title">Shop by category</h2>
              <div className="shop-by-category__content">
                <Link to="phones" className="shop-by-category__banner">
                  <div className="shop-by-category__image phone">
                    <img
                      src="./img/bannerPhone.svg"
                      alt=""
                      className="shop-by-category__image--phone"
                    />
                  </div>
                  <div className="shop-by-category__spec-row">
                    <h4 className="shop-by-category__spec-label">
                      Mobile phones
                    </h4>
                    <span className="shop-by-category__spec-value">
                      {productPhone.length} models
                    </span>
                  </div>
                </Link>
                <Link to="tablets" className="shop-by-category__banner">
                  <div className="shop-by-category__image tablet">
                    <img
                      src="./img/bannerTablets.svg"
                      alt=""
                      className="shop-by-category__image--tablet"
                    />
                  </div>
                  <div className="shop-by-category__spec-row">
                    <h4 className="shop-by-category__spec-label">Tablets</h4>
                    <span className="shop-by-category__spec-value">
                      {productTablets.length} models
                    </span>
                  </div>
                </Link>
                <Link to="accessories" className="shop-by-category__banner">
                  <div className="shop-by-category__image accessorie">
                    <img
                      src="./img/bannerAccesories.svg"
                      alt=""
                      className="shop-by-category__image--accessorie"
                    />
                  </div>

                  <div className="shop-by-category__spec-row">
                    <h4 className="shop-by-category__spec-label">
                      Accessories
                    </h4>
                    <span className="shop-by-category__spec-value">
                      {productAccessories.length} models
                    </span>
                  </div>
                </Link>
              </div>
            </section>
            <ProductsSlider newProducts={discountProducts} title="Hot prices" />
          </div>
        </div>
      </main>
    </>
  );
};
