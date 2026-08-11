import React from 'react';
import styles from './ShopByCategory.module.scss';
import apiProducts from '../../../../../public/api/products.json';
import { useNavigate } from 'react-router-dom';

enum Category {
  phones = 'phones',
  tablets = 'tablets',
  accessories = 'accessories',
}

export const ShopByCategory: React.FC = () => {
  const navigate = useNavigate();

  const getModelsCount = (category: string) => {
    if (category === Category.phones) {
      return apiProducts.filter(product => product.category === Category.phones)
        .length;
    } else if (category === Category.tablets) {
      return apiProducts.filter(
        product => product.category === Category.tablets,
      ).length;
    } else if (category === Category.accessories) {
      return apiProducts.filter(
        product => product.category === Category.accessories,
      ).length;
    } else {
      return 0;
    }
  };

  return (
    <div className={styles.shopbycategory}>
      <h2 className={styles.shopbycategory__title}>Shop by category</h2>
      <div className={styles.shopbycategory__categories}>
        <div
          className={styles.shopbycategory__category_card}
          onClick={() => navigate('/phones')}
        >
          <img
            src="/react_phone-catalog/pictures/shop-by-category--phones.png"
            alt="Phones"
            className={styles.shopbycategory__category_card__image}
          />
          <h4 className={styles.shopbycategory__category_card__title}>
            Mobile phones
          </h4>
          <p className={styles.shopbycategory__category_card__p}>
            {getModelsCount(Category.phones)} models
          </p>
        </div>
        <div
          className={styles.shopbycategory__category_card}
          onClick={() => navigate('/tablets')}
        >
          <img
            src="/react_phone-catalog/pictures/shop-by-category--tablets.png"
            alt="Tablets"
            className={styles.shopbycategory__category_card__image}
          />
          <h4 className={styles.shopbycategory__category_card__title}>
            Tablets
          </h4>
          <p className={styles.shopbycategory__category_card__p}>
            {getModelsCount(Category.tablets)} models
          </p>
        </div>
        <div
          className={styles.shopbycategory__category_card}
          onClick={() => navigate('/accessories')}
        >
          <img
            // eslint-disable-next-line max-len
            src="/react_phone-catalog/pictures/shop-by-category--accessories.png"
            alt="Accessories"
            className={styles.shopbycategory__category_card__image}
          />
          <h4 className={styles.shopbycategory__category_card__title}>
            Accessories
          </h4>
          <p className={styles.shopbycategory__category_card__p}>
            {getModelsCount(Category.accessories)} models
          </p>
        </div>
      </div>
    </div>
  );
};
