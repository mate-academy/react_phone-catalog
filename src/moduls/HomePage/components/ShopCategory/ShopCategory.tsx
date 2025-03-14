import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { StateContext } from '../../../../Provider/GadgetsContext';
import styles from './ShopCategory.module.scss';
import { categoriesInfo } from './CategoriesInfo';

export const ShopCategory = () => {
  const { phones, tablets, accessories } = useContext(StateContext);

  const categories = categoriesInfo(phones, tablets, accessories);

  return (
    <section>
      <h2 className={styles.categories__title}>Shop by category</h2>
      <div className={styles.categories}>
        {categories.map(item => (
          <Link to={item.name} key={item.name} className={styles[item.name]}>
            <div className={styles.img__wrapper}>
              <img src={item.img} alt={`${item.name} catecogory`} />
            </div>
            <h4>{item.title}</h4>
            <p>{`${item.count} models`}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};
