import { useEffect, useState } from 'react';
import './HomePage.scss';
import { PicturesSlides } from '../PicturesSlides';
import { Product } from '../../types/Product';
import { getProducts } from '../../api/products';
import { Link } from 'react-router-dom';
import { ProductsSlider } from '../ProductsSlider';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const brandNewProducts = [...products]
    .sort((product1, product2) => {
      return product2.year - product1.year;
    })
    .slice(0, 8);

  const hotPriceProducts = [...products]
    .sort((product1, product2) => {
      const discount1 = product1.fullPrice - product1.price;
      const discount2 = product2.fullPrice - product2.price;

      return discount2 - discount1;
    })
    .slice(0, 8);

  const phonesAmount = products.filter(
    product => product.category === 'phones',
  ).length;

  const tabletsAmount = products.filter(
    product => product.category === 'tablets',
  ).length;

  const accessoriesAmount = products.filter(
    product => product.category === 'accessories',
  ).length;

  useEffect(() => {
    getProducts().then(productsFromServer => {
      setProducts(productsFromServer);
    });
  }, []);

  return (
    <>
      <h1 className="visually-hidden">Home page</h1>

      <section className="home-page__section">
        <h1 className="home-page__section-title-h1">
          Welcome to Nice Gadgets store!
        </h1>

        <PicturesSlides />
      </section>

      <section className="home-page__section">
        <ProductsSlider title="Brand new models" products={brandNewProducts} />
      </section>

      <section className="home-page__section">
        <h2 className="home-page__section-title">Shop by category</h2>

        <div className="home-page__categories">
          <Link to="/phones" className="home-page__category">
            <article>
              <img
                className="home-page__category-image"
                src="./img/category-phones.svg"
                alt="Phones category"
                width={'300'}
              />

              <h3 className="home-page__category-title">Mobile phones</h3>
              <p className="home-page__category-count">{phonesAmount} models</p>
            </article>
          </Link>

          <Link to="/tablets" className="home-page__category">
            <article>
              <img
                className="home-page__category-image"
                src="./img/category-tablets.svg"
                alt="Tablets category"
                width={'300'}
              />

              <h3 className="home-page__category-title">Tablets</h3>
              <p className="home-page__category-count">
                {tabletsAmount} models
              </p>
            </article>
          </Link>

          <Link to="/accessories" className="home-page__category">
            <article>
              <img
                className="home-page__category-image"
                src="./img/category-accessories.svg"
                alt="Accesories category"
                width={'300'}
              />

              <h3 className="home-page__category-title">Accessories</h3>
              <p className="home-page__category-count">
                {accessoriesAmount} models
              </p>
            </article>
          </Link>
        </div>
      </section>

      <section className="home-page__section">
        <ProductsSlider title="Hot prices" products={hotPriceProducts} />
      </section>
    </>
  );
};
