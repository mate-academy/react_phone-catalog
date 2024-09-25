import React from 'react';
import { Link } from 'react-router-dom';
import phones from '../../public/api/phones.json';
import tablets from '../../public/api/tablets.json';
import accessories from '../../public/api/accessories.json';
import style from './ShopByCategory.module.scss';

export const ShopByCategory: React.FC = () => {
  const filteredPhones = phones.filter(phone => phone.category === 'phones');
  const filteredTablets = tablets.filter(
    tablet => tablet.category === 'tablets',
  );
  const filteredAccessories = accessories.filter(
    accessory => accessory.category === 'accessories',
  );

  return (
    <>
      <div className={style.category}>
        <h1 className={style.title}>Shop by category</h1>
        <div className={style.categorys}>
          <div className={style.categoryItem}>
            <div className={style.mobile}>
              <Link to="/phones">
                <img
                  src="img/category-phones.svg"
                  alt="Mobile phones"
                  className={style.image}
                />
              </Link>
            </div>
            <div className={style.categoryInfo}>
              <p>Mobile phones</p>
              <p>{filteredPhones.length} models</p>
            </div>
          </div>

          <div className={style.categoryItem}>
            <div className={style.tablet}>
              <Link to="/tablets">
                <img
                  src="img/category-tablets.svg"
                  alt="Tablets"
                  className={style.image}
                />
              </Link>
            </div>
            <div className={style.categoryInfo}>
              <p>Tablets</p>
              <p>{filteredTablets.length} models</p>
            </div>
          </div>

          <div className={style.categoryItem}>
            <div className={style.accessories}>
              <Link to="/accessories">
                <img
                  src="img/category-accessories.svg"
                  alt="Accessories"
                  className={style.image}
                />
              </Link>
            </div>
            <div className={style.categoryInfo}>
              <p>Accessories</p>
              <p>{filteredAccessories.length} models</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
