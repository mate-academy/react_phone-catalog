import { Link } from 'react-router-dom';
import styles from './Categories.module.scss';
import { categoriesData } from '../../utils';
const BASE_URL = import.meta.env.BASE_URL || '/';

type Props = {
  phonesQuantity: number;
  tabletsQuantity: number;
  accessoriesQuantity: number;
};

export const Categories: React.FC<Props> = props => {
  return (
    <div className={styles.categories}>
      <h2 className={styles.title}>Shop by category</h2>

      <div className={styles.categories__items}>
        {categoriesData.map(({ name, path, image, quantity }) => (
          <div className={styles.categories__item} key={path}>
            <div className={styles.categories__image}>
              <Link to={path}>
                <img
                  src={`${BASE_URL}/img/categories/${image}`}
                  alt={`${name} Category`}
                />
              </Link>
            </div>
            <Link to={path}>
              <h4 className={styles.categories__name}>{name}</h4>
            </Link>
            <p className={styles.categories__text}>
              {props[quantity as keyof Props]} models
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
