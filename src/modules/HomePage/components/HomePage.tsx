/* eslint-disable max-len */
import React, { useContext, useEffect } from 'react';
import { AnimatedLayout } from '../../shared/Shared_Components/AnimatedComponents/AnimatedLayout';
import { TitleSlider } from './TitleSlider/TitleSlider';
import { NewItems } from './NewItems/NewItems';
import { ShopByCategory } from './ShopByCategory/ShopByCategory';
import { HotPrices } from './HotPrices/HotPrices';
import { DarkModeContext } from '../../../Store/StoreThemeMode';
import classNames from 'classnames';

export const HomePage: React.FC = () => {
  const { isDark } = useContext(DarkModeContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AnimatedLayout>
      <section>
        <h1
          className={classNames('title title__home--h1 title--h1 container', {
            'title--is-Dark': isDark,
          })}
        >
          Welcome to Nice Gadgets store!
        </h1>

        <TitleSlider />

        <div className="container">
          <NewItems />

          <ShopByCategory />

          <HotPrices />
        </div>
      </section>
    </AnimatedLayout>
  );
};
