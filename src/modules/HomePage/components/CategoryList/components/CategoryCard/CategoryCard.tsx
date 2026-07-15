import { Link } from 'react-router-dom';
import styles from './CategoryCard.module.scss';
import { Category } from './types';
import classNames from 'classnames';
import { getImageUrl } from '../../../../../shared/utils/getImageUrl';

export const CategoryCard: React.FC<Category> = ({
  to,
  imageSrc,
  altText,
  title,
  count,
}) => {
  return (
    <li className={styles.card}>
      <Link to={to} className={styles.card__link}>
        <div className={styles.card__wrapper}>
          <div className={styles.card__background}>
            <img
              src={getImageUrl(imageSrc)}
              alt={altText}
              className={classNames(
                styles.card__image,
                styles[`card__image--${title.split(' ')[0].toLowerCase()}`],
              )}
            />
          </div>
        </div>

        <h3 className={styles.card__title}>{title}</h3>
        <span className={styles.card__count}>
          {count !== 1 ? `${count} models` : `${count} model`}
        </span>
      </Link>
    </li>
  );
};
