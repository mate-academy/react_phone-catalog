import { Link } from 'react-router-dom';
import { Product } from '../../../types/Product';
import styles from './Category.module.scss';
import classNames from 'classnames';

type Props = {
  products: Product[];
};

export const Category: React.FC<Props> = ({ products }) => {
  const mobiles = products.filter(product => product.category === 'phones');
  const tablets = products.filter(product => product.category === 'tablets');
  const accessories = products.filter(
    product => product.category === 'accessories',
  );

  const categorys = [
    {
      category: 'Mobile phones',
      imgSrc: './img/category-phones.png',
      categoryLength: mobiles.length,
      pathname: '/phones',
    },
    {
      category: 'Tablets',
      imgSrc: './img/category-tablets.png',
      categoryLength: tablets.length,
      pathname: '/tablets',
    },
    {
      category: 'Accessories',
      imgSrc: './img/category-accessories.png',
      categoryLength: accessories.length,
      pathname: '/accessories',
    },
  ];

  const categoryClass = (category: string): string => {
    switch (category) {
      case 'Mobile phones':
        return 'category__img--mobile';
      case 'Tablets':
        return 'category__img--tablets';
      case 'Accessories':
        return 'category__img--accessories';
      default:
        return '';
    }
  };

  return (
    <div className={styles.category}>
      {categorys.map((category, index) => (
        <div key={index} className={styles.category__card}>
          <Link to={category.pathname} className={styles.category__item}>
            <img
              className={classNames(
                styles.category__img,
                styles[categoryClass(category.category)],
              )}
              src={category.imgSrc}
              alt={category.category}
            />
          </Link>
          <h3 className={styles.category__title}>{category.category}</h3>
          <p className={styles.category__info}>
            {category.categoryLength} models
          </p>
        </div>
      ))}
    </div>
  );
};
