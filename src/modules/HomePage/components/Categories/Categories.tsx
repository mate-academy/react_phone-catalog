import classNames from 'classnames';
import styles from './Categories.module.scss';
import { Link } from 'react-router-dom';
import { getPublicPath } from '../../../shared/utils/pathHelper';

const CATEGORIES = [
  {
    to: '/phones',
    title: 'Mobile phones',
    count: '95 models',
    img: 'img/category-phones.png',
    bgClass: styles.bgPhones,
    imgClass: styles.imgPhones,
  },
  {
    to: '/tablets',
    title: 'Tablets',
    count: '24 models',
    img: 'img/category-tablets.png',
    bgClass: styles.bgTablets,
    imgClass: styles.imgTablets,
  },
  {
    to: '/accessories',
    title: 'Accessories',
    count: '100 models',
    img: 'img/category-accessories.png',
    bgClass: styles.bgAccessories,
    imgClass: styles.imgAccessories,
  },
];

export const Categories = () => {
  return (
    <div className="grid">
      {CATEGORIES.map(cat => (
        <Link key={cat.to} to={cat.to} className={styles.categoryItem}>
          <div className={classNames(styles.imageWrapper, cat.bgClass)}>
            <img
              src={getPublicPath(cat.img)}
              alt={cat.title}
              className={classNames(styles.categoryImage, cat.imgClass)}
            />
          </div>
          <h4 className={styles.title}>{cat.title}</h4>
          <div className="body-text">{cat.count}</div>
        </Link>
      ))}
    </div>
  );
};
