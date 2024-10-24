import classNames from 'classnames';

import style from './HomePage.module.scss';
import { PhoneSlider } from '../../components/PhoneSlider';
import { useContext, useMemo } from 'react';
import { StateContext } from '../../components/GlobalProvider';
import { getNewProducts } from '../../utils/getNewProducts';
import { Categories } from '../../components/Categories';
import { getHotDealsProducts } from '../../utils/getHotDealsProducts';
import { PicturesSlider } from '../../components/PicturesSlider';

export const HomePage = () => {
  const { products, phones, tablets, accessories } = useContext(StateContext);
  const newPhone = useMemo(() => getNewProducts(products), [products]);
  const hotDealsProducts = useMemo(
    () =>
      getHotDealsProducts(products, [...phones, ...tablets, ...accessories]),
    [products, phones, tablets, accessories],
  );

  return (
    <div className={classNames(style.container)}>
      <div className={classNames(style.title)}>
        <h1 className={classNames(style.title_text)}>
          Welcome to Nice Gadgets store!
        </h1>
      </div>

      <div className={classNames(style.container_homepage)}>
        <div className={classNames(style.photoSlide)}>
          <PicturesSlider />
        </div>

        <div className={classNames(style.slider_container)}>
          <PhoneSlider
            title="Brand new models"
            products={newPhone}
          />
        </div>

        <div className={classNames(style.container_categories)}>
          <div className={classNames(style.container_categories_body)}>
            <Categories />
          </div>
        </div>

        <div className={classNames(style.slider_container)}>
          <PhoneSlider
            title="Hot prices"
            products={hotDealsProducts}
          />
        </div>
      </div>
    </div>
  );
};
