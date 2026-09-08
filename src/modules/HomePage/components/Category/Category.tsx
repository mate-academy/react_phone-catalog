import { NavLink } from 'react-router-dom';
import { CategoryType } from '../../../shared/types/CategoryType';
import styles from './Category.module.scss';
import { useProduct } from '../../../../store/ProductContext';

type Props = {
  category: CategoryType;
};

export const Category: React.FC<Props> = ({ category }) => {
  const { products } = useProduct();
  const counter = products.filter(
    item => item.category === category.page,
  ).length;

  const { image, fullName, page } = category;

  return (
    <div className={styles.category__container}>
      <NavLink to={page} end className={styles.category__link}>
        <div className={styles.category__image_container}>
          <img
            className={styles.category__image}
            src={`${image}`}
            alt={fullName}
          />
        </div>
        <div className={styles.category__name}>{fullName}</div>
      </NavLink>
      <div className={styles.category__counter}>{counter} models</div>
    </div>
  );
};
