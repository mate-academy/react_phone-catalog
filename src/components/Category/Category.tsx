import React, { useMemo } from 'react';
import styles from './Category.module.scss';
import '../../styles/App.scss';
import SecondaryTitle from '../SecondaryTitle';
import CategoryCard from '../CategoryCard';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

const Category: React.FC = () => {
  const { products } = useSelector((state: RootState) => state.products);

  const phonesLen = useMemo(
    () => products?.filter(item => item.category === 'phones').length,
    [products],
  );

  const tabletsLen = useMemo(
    () => products?.filter(item => item.category === 'tablets').length,
    [products],
  );

  const accessoriesLen = useMemo(
    () => products?.filter(item => item.category === 'accessories').length,
    [products],
  );

  return (
    <section className={`${styles.category} page__category`}>
      <SecondaryTitle>Shop by category</SecondaryTitle>
      <div className={styles.category__cards}>
        <CategoryCard
          image="./img/category/phones.png"
          title="Mobile phones"
          models={`${phonesLen} models`}
          linkTo="/phones"
        />
        <CategoryCard
          image="./img/category/tablets.png"
          title="Tablets"
          models={`${tabletsLen} models`}
          linkTo="/tablets"
        />
        <CategoryCard
          image="./img/category/accessories.png"
          title="Accessories"
          models={`${accessoriesLen} models`}
          linkTo="/accessories"
        />
      </div>
      <div></div>
    </section>
  );
};

export default Category;
