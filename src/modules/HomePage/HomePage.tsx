import { useEffect } from 'react';
import { Slider } from './components/Slider/Slider';
import styles from './HomePage.module.scss';
import { getNewModels, getProducts } from '../../utils/api';
import { NewModels } from './components/NewModels';
import { useAppContext } from '../../context/AppContext';

export const HomePage = () => {
  const { setNewPhoneModels } = useAppContext();

  useEffect(() => {
    getProducts().then(productsFromServer => {
      setNewPhoneModels(getNewModels('phones', productsFromServer));
    });
  }, [setNewPhoneModels]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <section className={styles.sliderSection}>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
          </div>
          <Slider />
        </section>

        <NewModels />
      </main>
    </div>
  );
};
