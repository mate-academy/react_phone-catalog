import style from './HotPrices.module.scss';
import arrowLeft from '../../assets/img/icons/arrow-left.png';
import arrowRight from '../../assets/img/icons/arrow-right.png';
import { ProductCard } from '../ProductCard';

export const HotPrices = () => (
  <section className={style.hotPrices}>
    <div className={style.hotPrices__header}>
      <h2 className={style.hotPrices__title}>Brand new models</h2>
      <div className={style.hotPrices__arrows}>
        <img src={arrowLeft} className={style.hotPrices__arrowLeft} />
        <img src={arrowRight} className={style.hotPrices__arrowRight} />
      </div>
    </div>
    <div className={style.hotPrices__productCard}>
      <ProductCard />
    </div>
  </section>
);
