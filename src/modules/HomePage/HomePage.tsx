import { useEffect, useState } from 'react';
import { Slider } from './components/Slider/Slider';
import styles from './HomePage.module.scss';
import { Product } from '../../types/Product';
import { getProducts } from '../../utils/api';
import { NewModels } from './components/NewModels';

export const HomePage = () => {
  // const [phones, setPhones] = useState<Phone[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // getPhones().then(phonesFromServer => setPhones(phonesFromServer));
    getProducts().then(productsFromServer => setProducts(productsFromServer));
  }, []);

  const getNewModels = (category: string) => {
    const newProducts = products.filter(
      product => product.category === category,
    );

    newProducts.sort((product1: Product, product2: Product) => {
      return Number(product2.year) - Number(product1.year);
    });

    if (!newProducts.length) {
      return [];
    }

    const currentYear = Number(newProducts[0].year);

    return newProducts.filter(
      newProduct => Number(newProduct.year) === currentYear,
    );
  };

  const newPhonesModels = getNewModels('phones');

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <section className={styles.sliderSection}>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
          </div>
          <Slider />
        </section>
        <section>
          <NewModels newPhonesModels={newPhonesModels} />
        </section>
      </main>
    </div>
  );
};
