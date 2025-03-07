import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { StateContext } from '../../../../store/GadgetsContext';
import styles from './ShopCategory.module.scss';
import { BASE_URL } from '../../../../utils/httpClient';

export const ShopCategory = () => {
  const { phones, tablets, accessories } = useContext(StateContext);

  const categories = [
    {
      title: 'Mobile phones',
      count: phones.length,
      img: `${BASE_URL}img/categories/category-phones.png`,
      name: 'phones',
    },
    {
      title: 'Tablets',
      count: tablets.length,
      img: `${BASE_URL}img/categories/category-tablets.png`,
      name: 'tablets',
    },
    {
      title: 'Accessories',
      count: accessories.length,
      img: `${BASE_URL}img/categories/category-accessories.png`,
      name: 'accessories',
    },
  ];

  return (
    <section>
      <h2 className={styles.categories__title}>Shop by category</h2>
      <div className={styles.categories}>
        {categories.map(item => (
          <Link to={item.name} key={item.name} className={styles[item.name]}>
            <div className={styles.img__wrapper}>
              <img src={item.img} alt="" />
            </div>
            <h4>{item.title}</h4>
            <p>{`${item.count} models`}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};
