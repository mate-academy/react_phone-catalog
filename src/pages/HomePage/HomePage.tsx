import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import { CategoryCards } from '../../components/CategoryCards';
import { Loader } from '../../components/Loader';
import { ProductBanners } from '../../components/ProductBanners';
import { ProductList } from '../../components/ProductList';

import { SortOrders } from '../../types/SortOrders';
import { Sorts } from '../../types/Sorts';

import { Categories } from '../../types/Categories';
import { getSortedProducts } from '../../utils/getSortedProducts';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { fetchAllProducts } from '../../store/slices/productsSlice';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const { items, loading } = useAppSelector(state => state.products);
  const dispatch = useAppDispatch();

  const phones = items.filter(item => item.category === Categories.phones);

  const newPhones = getSortedProducts(phones, Sorts.year, SortOrders.desc);
  const discountPhones = getSortedProducts(
    phones,
    Sorts.price,
    SortOrders.desc,
  );

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <>
      <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>

      <ProductBanners />

      {loading && <Loader />}

      {newPhones.length ? (
        <ProductList
          title="Brand new models"
          products={newPhones}
          isHaveSlider={true}
        />
      ) : (
        <p>Phones not found</p>
      )}

      <CategoryCards products={items} />

      {newPhones.length ? (
        <ProductList
          title="Hot prices"
          products={discountPhones}
          isHaveSlider={true}
          isHotPrice={true}
        />
      ) : (
        <p>Phones not found</p>
      )}
    </>
  );
};
