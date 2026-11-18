import { useEffect, useState } from 'react';
import { productService } from '../../services/productService';
import { ProductsSlider } from './components/ProdutsSlider';
import { Slider } from './components/Slider';
import styles from './HomePage.module.scss';
import { NormalizedProduct } from '../../interfaces/Product';
import { Link } from 'react-router-dom';
import { normalizeProduct } from '../../utils/normalizeProduct';

const CATEGORIES = [
  {
    to: '/phones',
    title: 'Mobile phones',
    image: 'img/imgs/category-phone.png',
  },
  { to: '/tablets', title: 'Tablets', image: 'img/imgs/category-tablets.png' },
  {
    to: '/accessories',
    title: 'Accessories',
    image: 'img/imgs/category-accessories.png',
  },
];

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
            <picture>
              <source
                media="(min-width: 640px)"
                srcSet="img/imgs/header-slider1.jpg"
              />
              <img src="img/imgs/header-slider1-mobile.jpg" alt="Slide 1" />
            </picture>
          </div>
          <div>
            <picture>
              <source
                media="(min-width: 640px)"
                srcSet="img/imgs/header-slider2.jpg"
              />
              <img src="img/imgs/header-slider2-mobile.jpg" alt="Slide 2" />
            </picture>
          </div>
          <div>
            <picture>
              <source
                media="(min-width: 640px)"
                srcSet="img/imgs/header-slider3.jpg"
              />
              <img src="img/imgs/header-slider3-mobile.jpg" alt="Slide 3" />
            </picture>
          </div>
        </Slider>
      </header>
      <div className={styles.container}>
        <ProductsSlider
          title="Brand new models"
          products={newProducts}
          showOnlyFullPrice={true}
        />
        <div className="inline-container">
          <section className={styles.categories}>
            <h2 className="section-title">Shop by category</h2>
            <ul className={styles.categories__list}>
              {CATEGORIES.map(category => (
                <li key={category.to} className={styles.categories__item}>
                  <Link to={category.to} className={styles.category}>
                    <div className={styles.category__imageWrapper}>
                      <img
                        src={category.image}
                        alt=""
                        className={styles.category__image}
                      />
                    </div>
                    <span className={styles.category__name}>
                      {category.title}
                    </span>
                    <span className={styles.category__info}>10 models</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <ProductsSlider title="Hot prices" products={hotPrices} />
      </div>
    </>
  );
};
