import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useAppSelector } from '../../redux/hooks';
import { selectPhones } from '../../redux/slices/phonesSlice';
import { selectTablets } from '../../redux/slices/tabletsSlice';
import { selectAccessories } from '../../redux/slices/accessoriesSlice';
import styles from './ShopByCategory.module.scss';

export const ShopByCategory = () => {
  const { phones } = useAppSelector(selectPhones);
  const { tablets } = useAppSelector(selectTablets);
  const { accessories } = useAppSelector(selectAccessories);

  const phonesCount = useMemo(() => phones.length, [phones]);
  const tabletsCount = useMemo(() => tablets.length, [tablets]);
  const accessoriesCount = useMemo(() => accessories.length, [accessories]);

  return (
    <div className={styles.shopByCategory}>
      <h2 className={styles.title}>Shop by category</h2>

      <div className={styles.categories}>
        <div className={styles.category}>
          <Link
            className={classNames(styles.imgLink, styles.imgLink1)}
            to="/phones"
          >
            <img
              className={classNames(styles.img, styles.img1)}
              src="img/category-phones.webp"
              alt="Mobile phones"
            />
          </Link>

          <p className={styles.categoryName}>Mobile phones</p>
          <p className={styles.categoryCount}>
            {phonesCount !== 1
              ? `${phonesCount} models`
              : `${phonesCount} model`}
          </p>
        </div>

        <div className={styles.category}>
          <Link
            className={classNames(styles.imgLink, styles.imgLink2)}
            to="/tablets"
          >
            <img
              className={classNames(styles.img, styles.img2)}
              src="img/category-tablets.png"
              alt="Tablets"
            />
          </Link>

          <p className={styles.categoryName}>Tablets</p>
          <p className={styles.categoryCount}>
            {tabletsCount !== 1
              ? `${tabletsCount} models`
              : `${tabletsCount} model`}
          </p>
        </div>

        <div className={styles.category}>
          <Link
            className={classNames(styles.imgLink, styles.imgLink3)}
            to="/accessories"
          >
            <img
              className={classNames(styles.img, styles.img3)}
              src="img/category-accessories.png"
              alt="Accessories"
            />
          </Link>

          <p className={styles.categoryName}>Accessories</p>
          <p className={styles.categoryCount}>
            {accessoriesCount !== 1
              ? `${accessoriesCount} models`
              : `${accessoriesCount} model`}
          </p>
        </div>
      </div>
    </div>
  );
};
