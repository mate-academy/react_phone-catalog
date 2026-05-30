import { Link } from 'react-router-dom';
import styles from './Categories.module.scss';
import { useContext } from 'react';
import { ProductsContext } from '../../contexts/ProductsContext';
// eslint-disable-next-line max-len
import { filterProductsByCategory } from '../../utils/functions/filterProductsByCategory';

interface CategoryProps {
  to: string;
  imgSrc: string;
  title: string;
  itemCount: number;
}

const Category: React.FC<CategoryProps> = ({
  to,
  imgSrc,
  title,
  itemCount,
}) => (
  <div className={styles.category__item}>
    <Link to={to} className={styles.category__link}>
      <div className={styles['category__img-container']}>
        <img
          className={styles.category__img}
          src={imgSrc}
          alt={`${title} category image`}
        />
      </div>
    </Link>
    <Link className={styles.category__subtitle} to={to}>
      {title}
    </Link>
    <p className={styles['category__total-items']}>{`${itemCount} models`}</p>
  </div>
);

export const Categories = () => {
  const { state } = useContext(ProductsContext);
  const { products } = state;

  const phones = filterProductsByCategory(products, 'phones');
  const tablets = filterProductsByCategory(products, 'tablets');
  const accessories = filterProductsByCategory(products, 'accessories');

  return (
    <div className={styles.category}>
      <h2 className={styles.category__title}>Shop by category</h2>
      <div className={styles.category__items}>
        <Category
          to="/phones"
          imgSrc="./img/mobile-phones-category.png"
          title="Mobile phones"
          itemCount={phones.length}
        />
        <Category
          to="/tablets"
          imgSrc="./img/tablets-category.png"
          title="Tablets"
          itemCount={tablets.length}
        />
        <Category
          to="/accessories"
          imgSrc="./img/accessories-category.png"
          title="Accessories"
          itemCount={accessories.length}
        />
      </div>
    </div>
  );
};
