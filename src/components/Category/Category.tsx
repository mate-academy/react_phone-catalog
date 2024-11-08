import { useAppSelector } from '../../app/hooks';
import styles from './Category.module.scss';
import { Link } from 'react-router-dom';

export const Category = () => {
  const products = useAppSelector(state => state.products.items);

  const mobileAmount = products.filter(
    product => product.category === 'phones',
  ).length;
  const tabletsAmount = products.filter(
    product => product.category === 'tablets',
  ).length;
  const accessoriesAmount = products.filter(
    product => product.category === 'accessories',
  ).length;

  return (
    <>
      <Link to={'phones'} className={styles.category_blocks_block}>
        <div>
          <img src="img/homePage/category/Phones.svg" alt="" />
          <h3>Mobile phones</h3>
          <p>{`${mobileAmount} models`}</p>
        </div>
      </Link>

      <Link to={'tablets'} className={styles.category_blocks_block}>
        <div>
          <img src="img/homePage/category/Tablets.svg" alt="" />
          <h3>Tablets</h3>
          <p>{`${tabletsAmount} models`}</p>
        </div>
      </Link>

      <Link to={'accessories'} className={styles.category_blocks_block}>
        <div>
          <img src="img/homePage/category/Accessories.svg" alt="" />
          <h3>Accessories</h3>
          <p>{`${accessoriesAmount} models`}</p>
        </div>
      </Link>
    </>
  );
};
