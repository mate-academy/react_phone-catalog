import { Link } from 'react-router-dom';
import { Container } from '../../components/Container/Container';
import style from './HomePage.module.scss';
import categoryPhones from '../../../public/img/category-phones.webp';
import categoryTablets from '../../../public/img/category-tablets.png';
import categoryAccessories from '../../../public/img/category-accessories.png';
import phones from '../../../public/api/phones.json';
import tablets from '../../../public/api/tablets.json';
import accessories from '../../../public/api/accessories.json';
import { scrollToTop } from '../../styles/utils/ScrollTop';
import { Slider } from '../../components/Slider/Slider';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import products from '../../../public/api/products.json';

export const HomePage = () => {
  const brandNew = [...products].sort((a, b) => b.year - a.year);
  const hotPrices = [...products]
    .filter(p => p.price < p.fullPrice)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));

  return (
    <Container>
      <div className={style.body}>
        <span className={style.title}>Welcome to Nice Gadgets store!</span>
        <h1>Product Catalog</h1>
        <Slider />
        <ProductSlider
          products={brandNew.map(item => item)}
          text="Brand new models"
        />
        <div className={`${style.body}`}>
          <h2>Shop by category</h2>
          <div className={`${style.category__block}`}>
            <Link
              to={'/phones'}
              className={style.category__card}
              onClick={scrollToTop}
            >
              <div className={`${style.category} ${style.category__phones}`}>
                <img
                  src={categoryPhones}
                  alt=""
                  className={style.product__photo}
                />
              </div>
              <h4 className={style.mainText}>Mobile phones</h4>
              <p className={style.secondaryText}>{phones.length} models</p>
            </Link>

            <Link
              to={'/tablets'}
              className={style.category__card}
              onClick={scrollToTop}
            >
              <div className={`${style.category} ${style.category__tablets}`}>
                <img
                  src={categoryTablets}
                  alt=""
                  className={style.product__photo}
                />
              </div>
              <h4 className={style.mainText}>Tablets</h4>
              <p className={style.secondaryText}>{tablets.length} models</p>
            </Link>

            <Link
              to={'/accessories'}
              className={style.category__card}
              onClick={scrollToTop}
            >
              <div
                className={`${style.category} ${style.category__accessories}`}
              >
                <img
                  src={categoryAccessories}
                  alt=""
                  className={style.product__photo}
                />
              </div>
              <h4 className={style.mainText}>Accessories</h4>
              <p className={style.secondaryText}>{accessories.length} models</p>
            </Link>
          </div>
        </div>
        <ProductSlider
          products={hotPrices.map(item => item)}
          text="Hot prices"
        />
      </div>
    </Container>
  );
};
