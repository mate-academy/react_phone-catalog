import React, { useEffect } from 'react';
import cl from './HomePage.module.scss';
import { ImgSlider } from './ImgSlider';
import { SlidingProdList, SlidingProdListOrigin } from './SlidingProdList';
import { Categories } from './Categories';
import {
  useAppDispatch,
  useAppSelector,
  useComponentLoading,
} from '../../app/hooks';
import { initProducts } from '../../features/productSlice';
import { Loader } from '../Loader';
import { PageTitle } from '../titles/PageTitle';

export const HomePage: React.FC = () => {
  // from app/hooks, simulates loading with 500ms delay
  const isLoading = useComponentLoading(500);

  const dispatch = useAppDispatch();
  const { productList } = useAppSelector(st => st.products);

  useEffect(() => {
    dispatch(initProducts());
  }, [dispatch]);

  const newModelsList = [...productList]
    .sort((prod1, prod2) => prod2.year - prod1.year)
    .slice(0, 12);

  // instead of conditional rendering we can use visibility styles for Loader and Components.
  // in that case component will render while Loader is shown(use this method to complex components)
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
        <h1>HOT PRICES</h1>
      </section>
    </div>
  );
};
