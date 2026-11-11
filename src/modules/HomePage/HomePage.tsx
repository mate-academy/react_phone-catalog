import { useEffect, useState } from 'react';
import { productService } from '../../services/productService';
import { ProductsSlider } from './components/ProdutsSlider';
import { Slider } from './components/Slider';
import styles from './HomePage.module.scss';
import { NormalizedProduct } from '../../interfaces/Product';
import { Link } from 'react-router-dom';
import { normalizeProduct } from '../../utils/normalizeProduct';

export const HomePage = () => {
  const [newProducts, setNewProducts] = useState<NormalizedProduct[]>([]);
  const [hotPrices, setHotPrices] = useState<NormalizedProduct[]>([]);

  useEffect(() => {
    productService.getNewest(8).then(response => {
      setNewProducts(response.map(item => normalizeProduct(item)));
    });
    productService.getBiggestDiscounts(8).then(response => {
      setHotPrices(response.map(item => normalizeProduct(item)));
    });
  }, []);

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.header__title}>Welcome to Nice Gadgets store!</h1>
        <Slider>
          <div>
            <img src="/img/imgs/header-slider1.png" alt="Slide 1" />
          </div>
          <div>
            <img src="/img/imgs/header-slider2.png" alt="Slide 2" />
          </div>
          <div>
            <img src="/img/imgs/header-slider3.png" alt="Slide 3" />
          </div>
        </Slider>
      </header>
      <div className={styles.container}>
        <ProductsSlider title="Brand new models" products={newProducts} />
        <div className="inline-container">
          <section className={styles.categories}>
            <h2 className="section-title">Shop by category</h2>
            <ul className={styles.categories__list}>
              <li className={styles.category}>
                <img
                  src="/img/imgs/category-phone.png"
                  alt="Phones"
                  className={styles.category__image}
                />
                <Link to="/phones" className={styles.category__name}>
                  Mobile phones
                </Link>
                <span className={styles.category__info}>10 models</span>
              </li>
              <li className={styles.category}>
                <img
                  src="/img/imgs/category-tablets.png"
                  alt="Tablets"
                  className={styles.category__image}
                />
                <Link to="/tablets" className={styles.category__name}>
                  Tablets
                </Link>
                <span className={styles.category__info}>10 models</span>
              </li>
              <li className={styles.category}>
                <img
                  src="/img/imgs/category-accessories.png"
                  alt="Accessories"
                  className={styles.category__image}
                />
                <Link to="/accessories" className={styles.category__name}>
                  Accessories
                </Link>
                <span className={styles.category__info}>10 models</span>
              </li>
            </ul>
          </section>
        </div>
        <ProductsSlider title="Hot prices" products={hotPrices} />
      </div>
    </>
  );
};
