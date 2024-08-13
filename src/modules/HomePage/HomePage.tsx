import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CategoryCards } from '../../components/CategoryCards';
import { Loader } from '../../components/Loader';
import { ProductBanners } from '../../components/ProductBanners';
import { ProductList } from '../../components/ProductList';

import { ERROR_MESSAGE } from '../../constants/errors';
import { getAllProducts } from '../../services/products';

import { Product } from '../../types/Product';
import { SortOrders } from '../../types/SortOrders';
import { Sorts } from '../../types/Sorts';

import { Categories } from '../../types/Categories';
import { getSortedProducts } from '../../utils/getSortedProducts';

import styles from './HomePage.module.scss';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const phones = products.filter(item => item.category === Categories.phones);

  const newPhones = getSortedProducts(phones, Sorts.year, SortOrders.desc);
  const discountPhones = getSortedProducts(
    phones,
    Sorts.price,
    SortOrders.desc,
  );

  useEffect(() => {
    setLoading(true);

    getAllProducts()
      .then(items => {
        setProducts(items);

        setLoading(false);
      })
      .catch(() => {
        setLoading(false);

        toast.error(ERROR_MESSAGE);
      });
  }, []);

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

      <CategoryCards products={products} />

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
