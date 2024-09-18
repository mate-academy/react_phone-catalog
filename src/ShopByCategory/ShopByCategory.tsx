import React from 'react';
import { Link } from 'react-router-dom';
import style from './ShopByCategory.module.scss';

export const ShopByCategory: React.FC = () => {
  return (
    <>
      <div className={style.category}>
        <h1 className={style.title}>Shop by category</h1>
        <div className={style.categorys}>
          <div className={style.categoryItem}>
            <div className={style.mobile}>
              <Link to="/phones">
                <img
                  src="../../public/img/category-phonesV2.png"
                  alt="Mobile phones"
                  className={style.image}
                />
              </Link>
            </div>
            <div className={style.categoryInfo}>
              <p>Mobile phones</p>
              <p>96 models</p>
            </div>
          </div>

          <div className={style.categoryItem}>
            <div className={style.tablet}>
              <Link to="/tablets">
                <img
                  src="../../public/img/category-tablets.webp"
                  alt="Tablets"
                  className={style.image}
                />
              </Link>
            </div>
            <div className={style.categoryInfo}>
              <p>Tablets</p>
              <p>26 models</p>
            </div>
          </div>

          <div className={style.categoryItem}>
            <div className={style.accessories}>
              <Link to="/accessories">
                <img
                  src="../../public/img/category-accessories.webp"
                  alt="Accessories"
                  className={style.image}
                />
              </Link>
            </div>
            <div className={style.categoryInfo}>
              <p>Accessories</p>
              <p>26 models</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
