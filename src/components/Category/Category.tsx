import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Category.module.scss';

import { CategoriesData } from '../../types/CategoriesData';

type Props = {
  data: CategoriesData;
  className: string;
};

export const Category: React.FC<Props> = ({ data, className }) => {
  const { title, link, countItems, img, modeficator } = data;

  return (
    <div className={classNames(styles.category, className)}>
      <Link
        to={`/${link}`}
        className={classNames(
          styles.category__link,
          styles[`category__link--${modeficator}`],
        )}
      >
        <img
          src={img}
          alt={title}
          className={classNames(
            styles.category__img,
            styles[`category__img--${modeficator}`],
          )}
        />
      </Link>
      <h3 className={styles.category__title}>{title}</h3>
      <p className={styles.category__text}>{countItems} models</p>
    </div>
  );
};
