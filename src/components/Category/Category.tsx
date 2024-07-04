import { useContext } from 'react';
import styles from './Category.module.scss';
import { ShopByCategoryMap } from '../../helpers/ShopCategory';
import { BASE_URL } from '../../utils/const';
import { Link } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';

const Category = () => {
  const { phones, tablets, accessories } = useContext(ProductContext);

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Shop by category</h1>

      <div className={styles.categories}>
        {ShopByCategoryMap.map(item => {
          let count;

          switch (item.title) {
            case 'Mobile phones':
              count = phones.length;
              break;
            case 'Tablets':
              count = tablets.length;
              break;
            case 'Accessories':
              count = accessories.length;
              break;
            default:
              count = 0;
          }

          return (
            <div key={item.title} className={styles.categoryContainer}>
              <Link
                to={item.path}
                className={styles.category}
                style={{ backgroundColor: item.color }}
              >
                <img
                  src={`${BASE_URL}/${item.src}`}
                  alt={item.title}
                  className={styles.image}
                />
              </Link>
              <h2 className={styles.subtitle}>{item.title}</h2>
              <p className={styles.count}>{`${count} models`}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Category;
