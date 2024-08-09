import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import accessoriesImage from '../../../api/img/category-accessories.webp';
import phonesImage from '../../../api/img/category-phones.webp';
import tabletsImage from '../../../api/img/category-tablets.webp';
import { setCategoryId } from '../../../redux/slices/categoriesSlice';
import styles from './category.module.scss';

export const Category = ({ title }) => {
  const dispatch = useDispatch();
  const categoryId = useSelector(state => state.category.categoryId);
  const products = useSelector(state => state.products.products);
  const countByCategory = category =>
    products.filter(product => product.category === category).length;

  const onChangeCategory = useCallback(idx => {
    dispatch(setCategoryId(idx));
  }, []);

  return (
    <section className={styles.root}>
      <div className={styles.top}>
        <h2>{title}</h2>
        <div className={styles.container}>
          <ul>
            <li>
              <Link
                to="/phones"
                onClick={() => {
                  dispatch(setCategoryId(1)), window.scrollTo(0, 0);
                }}
              >
                <div className={styles.image}>
                  <img src={phonesImage} alt="Mobile phones" />
                </div>
                <h3>Mobile phones</h3>
                <p>{countByCategory('phones')} models</p>
              </Link>
            </li>
            <li>
              <Link
                to="/tablets"
                onClick={() => {
                  dispatch(setCategoryId(2)), window.scrollTo(0, 0);
                }}
              >
                <div className={styles.image}>
                  <img src={tabletsImage} alt="Tablets" />
                </div>
                <h3>Tablets</h3>
                <p>{countByCategory('tablets')} models</p>
              </Link>
            </li>
            <li>
              <Link
                to="/accessories"
                onClick={() => {
                  dispatch(setCategoryId(3)), window.scrollTo(0, 0);
                }}
              >
                <div className={styles.image}>
                  <img src={accessoriesImage} alt="Accessories" />
                </div>
                <h3>Accessories</h3>
                <p>{countByCategory('accessories')} models</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
