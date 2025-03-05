import './HomePage.scss';
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
// import { Slider2 } from '../Slider2/Slider2';

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
    <main className="home-page">
      <div className="container">
        <section className="section section__main" id="main">
          <h1 className="section__title section__title--main">
            {translate('homePage.title', lang)}
          </h1>
          {/* <Slider2 /> */}
          <Slider />
        </section>
        <section className="section section__new-models" id="new-models">
          <h2 className="section__title">
            {translate('new-models.title', lang)}
          </h2>
          <Carousel items={newModels} visibleDiscount={false} />
        </section>
        <section className="section section__categories" id="categories">
          <h2 className="section__title">
            {translate('categories.title', lang)}
          </h2>
          <Categories />
        </section>
        <section className="section section__hot-prices" id="hot-prices">
          <h2 className="section__title">
            {translate('hot-prices.title', lang)}
          </h2>
          <Carousel items={hotModels} visibleDiscount={true} />
        </section>
      </div>
    </main>
  );
};
