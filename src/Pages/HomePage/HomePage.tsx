import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ProductSlider } from '../../Components/ProductSlider/ProductSlider';
import { Carousel } from '../../Components/Carousel/Carousel';
import {
  getBrandNewProducts, getHotPriceProducts, getProducts,
} from '../../Helpers/api/products';
import './HomePage.scss';
import { Product } from '../../Helpers/types/Product';
import { Header } from '../../Components/Header/index';

export const HomePage = () => {
  const [productsAmount, setProductsAmount] = useState([
    { title: 'Mobile phones', amount: 0, link: 'phones' },
    { title: 'Tablets', amount: 0, link: 'tablets' },
    { title: 'Accessories', amount: 0, link: 'accessories' },
  ]);
  const [hotProducts, setHotProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);

  useEffect(() => {
    getProducts().then(res => {
      const filter = (category: string) => {
        return res.filter((product: Product) => product.type === category)
          .length;
      };

      const phones = filter('phone');
      const tablets = filter('tablet');
      const accessories = filter('accessory');

      setProductsAmount([
        { title: 'Mobile phones', amount: phones, link: 'phones' },
        { title: 'Tablets', amount: tablets, link: 'tablets' },
        { title: 'Accessories', amount: accessories, link: 'accessories' },
      ]);
    });
    getHotPriceProducts()
      .then(res => setHotProducts(res));
    getBrandNewProducts()
      .then(res => setNewProducts(res));
  }, []);

  return (
    <>
      <Header />
      <div className="container">

        <Carousel />
        <div className="page__section">
          <ProductSlider title="Hot prices" products={hotProducts} />
        </div>
        <div className="HomePage__category page__section">
          <h2 className="title page__title">Shop by category</h2>

          <div
            className="HomePage__category-container"
            data-cy="categoryLinksContainer"
          >
            {productsAmount.map(({ amount, link, title }) => (
              <div key={link}>
                <NavLink to={`/${link}`}>
                  <div
                    className={`HomePage__category-img HomePage__category-img--${link}`}
                  />
                </NavLink>
                <p className="HomePage__category-link">
                  {title}
                </p>
                <p className="body-text body-text--light">{`${amount} models`}</p>
              </div>
            ))}

          </div>
        </div>

        <div className="page__section">
          <ProductSlider title="Brand new models" products={newProducts} />
        </div>
      </div>
    </>
  );
};
