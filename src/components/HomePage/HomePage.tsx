import styles from './HomePage.module.scss';
import { useContext, useEffect, useState } from 'react';
import { Categories } from '../Categories/Categories';
import { Slider } from '../Slider/Slider';
import { getHotModels, getNewModels } from '../../utils/api';
import { Product } from '../../types';
import { Carousel } from '../Carousel/Carousel';
import { useAppDispatch } from '../../app/hooks';
import { setPhonesAsync } from '../../features/phonesSlice';
import { setTabletsAsync } from '../../features/tabletsSlice';
import { setAccessoriesAsync } from '../../features/accessoriesSlice';
import { translate } from '../../utils/translate';
import { LangContext } from '../../context/LangContext';

export const HomePage = () => {
  const [newModels, setNewModels] = useState<Product[]>([]);
  const [hotModels, setHotModels] = useState<Product[]>([]);
  const { lang } = useContext(LangContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getNewModels().then(setNewModels);
    getHotModels().then(setHotModels);

    dispatch(setPhonesAsync());
    dispatch(setTabletsAsync());
    dispatch(setAccessoriesAsync());
  }, [dispatch]);

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');

    document.documentElement.setAttribute(
      'data-theme',
      currentTheme === 'dark' ? 'light' : 'dark',
    );
  };

  const themeToggle = document.getElementById('theme-toggle');

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  return (
    <main className={styles.homePage}>
      <div className={styles.homePage__container}>
        <section className={styles.section}>
          <h1 className={styles.homePage__title}>Product Catalog</h1>
          <h1 className={styles.section__title}>
            {translate('homePage.title', lang)}
          </h1>
          <Slider />
        </section>
        <section className={styles.section}>
          <h2 className={styles.section__title}>
            {translate('new-models.title', lang)}
          </h2>
          <Carousel items={newModels} visibleDiscount={false} />
        </section>
        <section className={styles.section}>
          <h2 className={styles.section__title}>
            {translate('categories.title', lang)}
          </h2>
          <Categories />
        </section>
        <section className={styles.section}>
          <h2 className={styles.section__title}>
            {translate('hot-prices.title', lang)}
          </h2>
          <Carousel items={hotModels} visibleDiscount={true} />
        </section>
      </div>
    </main>
  );
};
