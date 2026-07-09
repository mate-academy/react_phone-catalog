import styles from './Categories.module.scss';

import Tablets from '../../assets/Category/Tablets_category.png';
import Accessories from '../../assets/Category/Accessories_category.png';
import Phones from '../../assets/Category/Phones_category.png';
import { Link } from 'react-router-dom';

type Props = {
  tabletLength: number;
  phoneLength: number;
  accessoriesLength: number;
};

export const Categories = ({
  tabletLength,
  phoneLength,
  accessoriesLength,
}: Props) => {
  return (
    <>
      <div className={styles.title}>Shop by category</div>

      <div className={styles.categories__container}>
        {/* Категорія 1 */}
        <div className={styles.category__item}>
          <Link to="/phones">
            <div className={styles.category__item__container}>
              <img
                className={styles['category__item__container-img']}
                src={Phones}
                alt="phones_category"
              />
            </div>
          </Link>
          <div className={styles.category__item__info}>
            <p className={styles.category__item__info__name}>Mobile phones</p>
            <p className={styles.category__item__info__count}>
              {phoneLength} models
            </p>
          </div>
        </div>

        {/* Категорія 2 */}
        <div className={styles.category__item}>
          <Link to="/tablets">
            <div className={styles.category__item__container}>
              <img
                className={styles['category__item__container-img']}
                src={Tablets}
                alt="tablets_category"
              />
            </div>
          </Link>
          {/* Додав обгортку info, щоб було як у першому блоці */}
          <div className={styles.category__item__info}>
            <p className={styles.category__item__info__name}>Tablets</p>
            <p className={styles.category__item__info__count}>
              {tabletLength} models
            </p>
          </div>
        </div>

        {/* Категорія 3 */}
        <div className={styles.category__item}>
          <Link to="/accessories">
            <div className={styles.category__item__container}>
              <img
                className={styles['category__item__container-img']}
                src={Accessories}
                alt="accessories_category"
              />
            </div>
          </Link>
          <div className={styles.category__item__info}>
            <p className={styles.category__item__info__name}>Accessories</p>
            <p className={styles.category__item__info__count}>
              {accessoriesLength} models
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
