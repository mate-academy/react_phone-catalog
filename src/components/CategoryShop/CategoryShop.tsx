import style from './CategoryShop.module.scss';
import mobiles from '../../assets/img/categoryShop/categoryShop_mobile.png';
import tablet from '../../assets/img/categoryShop/categoryShop__tablet.png';
// eslint-disable-next-line max-len
import accessories from '../../assets/img/categoryShop/categoryShop__accessories.png';

export const CategoryShop = () => (
  <section className={style.categoryShop}>
    <h2 className={style.categoryShop__title}>Shop by category</h2>
    <div className={style.categoryShop__content}>
      <article className={style.categoryShop__article}>
        <img
          src={mobiles}
          alt="mobile category"
          className={style.categoryShop__img}
        />
        <h4 className={style.categoryShop__name}>Mobile phones</h4>
        <p className={style.categoryShop__countModels}>95 models</p>
      </article>

      <article className={style.categoryShop__article}>
        <img
          src={tablet}
          alt="tablets category"
          className={style.categoryShop__img}
        />
        <h4 className={style.categoryShop__name}>Tablets</h4>
        <p className={style.categoryShop__countModels}>24 models</p>
      </article>

      <article className={style.categoryShop__article}>
        <img
          src={accessories}
          alt="accessories category"
          className={style.categoryShop__img}
        />
        <h4 className={style.categoryShop__name}>Accessories</h4>
        <p className={style.categoryShop__countModels}>100 models</p>
      </article>
    </div>
  </section>
);
