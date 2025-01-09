import React, { useMemo } from 'react';
import cl from './HomePage.module.scss';
import { ImgSlider } from './ImgSlider';
import { SlidingProdList, SlidingProdListOrigin } from './SlidingProdList';
import { Categories } from './Categories';
import { useAppSelector, useComponentLoading } from '../../app/hooks';
import { Loader } from '../Loader';
import { PageTitle } from '../titles/PageTitle';

export const HomePage: React.FC = () => {
  // from app/hooks, simulates loading with 300ms delay
  const isLoading = useComponentLoading(300);

  const { productList } = useAppSelector(st => st.products);

  // useMemo for optimization, array newModels will be calculated only once and will be saved between HomePage rerenders
  const newModelsList = useMemo(() => {
    const sortedList = [...productList].sort((p1, p2) => p2.year - p1.year);

    const newPhones = sortedList
      .filter(prod => prod.category === 'phones')
      .slice(0, 4);
    const newTablets = sortedList
      .filter(prod => prod.category === 'tablets')
      .slice(0, 4);
    const newAccessories = sortedList
      .filter(prod => prod.category === 'accessories')
      .slice(0, 4);

    const mergedArray = [];

    for (let i = 0; i < 4; i++) {
      mergedArray.push(newPhones[i], newTablets[i], newAccessories[i]);
    }

    return mergedArray;
  }, [productList]);

  const hotPricesList = useMemo(() => {
    const sortedList = [...productList].sort((prod1, prod2) => {
      const discount1 = 100 - Math.round((prod1.price / prod1.fullPrice) * 100);
      const discount2 = 100 - Math.round((prod2.price / prod2.fullPrice) * 100);

      return discount2 - discount1;
    });

    const hotPhones = sortedList
      .filter(p => p.category === 'phones')
      .slice(0, 4);
    const hotTablets = sortedList
      .filter(p => p.category === 'tablets')
      .slice(0, 4);
    const hotAccessories = sortedList
      .filter(p => p.category === 'accessories')
      .slice(0, 4);

    const mergedArray = [];

    for (let i = 0; i < 4; i++) {
      mergedArray.push(hotPhones[i], hotTablets[i], hotAccessories[i]);
    }

    return mergedArray;
  }, [productList]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="container">
      <PageTitle text="Welcome to Nice Gadgets store!" />
      <section className={cl.homePageSlider}>
        <ImgSlider />
      </section>
      <section className={cl.homePageSection}>
        <SlidingProdList
          origin={SlidingProdListOrigin.BRANDNEWMODELS}
          list={newModelsList}
        />
      </section>
      <section className={cl.homePageSection}>
        <Categories />
      </section>
      <section className={cl.homePageSection}>
        <SlidingProdList
          origin={SlidingProdListOrigin.HOTPRICES}
          list={hotPricesList}
        />
      </section>
    </div>
  );
};
