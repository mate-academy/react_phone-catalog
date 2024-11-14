import classNames from 'classnames';

import style from './HomePage.module.scss';
import { PhoneSlider } from '../../components/PhoneSlider';
import { useContext, useMemo } from 'react';
import { StateContext } from '../../components/GlobalProvider';
import { Categories } from '../../components/Categories';
import { PicturesSlider } from '../../components/PicturesSlider';
import { getProducts } from '../../utils/getProducts';

export const HomePage = () => {
  const { products } = useContext(StateContext);

  const newPhone = useMemo(
    () => getProducts.getNewProducts(products),
    [products],
  );

  const hotDealsProducts = useMemo(
    () => getProducts.getHotDealsProducts(products),
    [products],
  );

  return (
    <div className={classNames(style.container)}>
      <div className={classNames(style.title)}>
        <h1 className={classNames(style.title_text)}>
          Welcome to Nice Gadgets store!
        </h1>
      </div>

      <div className={classNames(style.container_homepage)}>
        <div className={classNames(style.photoSlide_wraper)}>
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
