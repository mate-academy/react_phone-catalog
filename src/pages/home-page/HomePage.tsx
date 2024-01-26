import { useContext } from 'react';

import './styles.scss';

import { Banner, ProductSlider, CategoriesBlock } from '../../libs/components';
import {
  StateContext,
} from '../../libs/components/state-provider/state-context';
import { getProductsCounts, getProductsByCategory } from '../../libs/helpers';
import { ProductsFilters } from '../../libs/enums';

export const HomePage: React.FC = () => {
  const { products } = useContext(StateContext);

  const productsCount = getProductsCounts(products);
  const hotProducts = getProductsByCategory(
    products,
    ProductsFilters.HOT_PRICE,
  );
  const newProducts = getProductsByCategory(
    products,
    ProductsFilters.NEW,
  );

  return (
    <main className="home-page">
      <div className="home-page__container">
        <Banner className="home-page__banner" />

        <ProductSlider
          products={hotProducts}
          title="Hot prices"
          className="home-page__section"
        />

        <CategoriesBlock
          productsCount={productsCount}
          title="Shop by category"
          className="home-page__section"
        />

        <ProductSlider
          products={newProducts}
          title="Brand new models"
          className="home-page__section"
        />
      </div>
    </main>
  );
};
