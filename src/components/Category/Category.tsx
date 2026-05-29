import { Link } from 'react-router-dom';
import styles from './Category.module.scss';

const baseUrl = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

const categoryInfo = [
  {
    img: `${baseUrl}img/category-phone.png`,
    title: 'Mobile phones',
    quantity: '124',
    link: '/phones',
    customClass: styles.mobiles,
  },
  {
    img: `${baseUrl}img/category-tablets.png`,
    title: 'Tablets',
    quantity: '36',
    link: '/tablets',
    customClass: styles.tablets,
  },
  {
    img: `${baseUrl}img/category-accessories.png`,
    title: 'Accessories',
    quantity: '34',
    link: '/accessories',
    customClass: styles.accessories,
  },
];

const Category = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Shop by category</h2>

      <div className={styles.category_list}>
        {categoryInfo.map((category, index) => (
          <Link
            to={category.link}
            key={index}
            className={`${styles.categoryCard} ${category.customClass}`}
          >
            <div className={styles.category_img}>
              <img
                src={category.img}
                alt={category.title}
                className={styles.category_image}
              />
            </div>

            <div className={styles.category_info}>
              <h3 className={styles.category_title}>{category.title}</h3>
              <p className={styles.category_quantity}>
                {category.quantity} models
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
