import style from './BrandNewModels.module.scss';
import arrowLeft from '../../assets/img/icons/arrow-left.png';
import arrowRight from '../../assets/img/icons/arrow-right.png';
import { ProductCard } from '../ProductCard';

export const BrandNewModels = () => (
  <section className={style.newModels}>
    <div className={style.newModels__header}>
      <h2 className={style.newModels__title}>Brand new models</h2>
      <div className={style.newModels__arrows}>
        <img src={arrowLeft} className={style.newModels__arrowLeft} />
        <img src={arrowRight} className={style.newModels__arrowRight} />
      </div>
    </div>
    <div className={style.newModels__productCard}>
      <ProductCard />
    </div>
  </section>
);
