// import products from './../../../../api/products.json';
import { ProductsSlider } from '../ProductsSlider';
import { Welcome } from '../Welcome';
import { Categories } from '../Categories';

import './Main.scss';
import { memo, useContext } from 'react';
import { selectingProducts } from '../../../utils/selectingProducts';
import { StateContext } from '../../../utils/GlobalStateProvider';

type Props = {
  isLoading: boolean;
};

// eslint-disable-next-line react/display-name
export const Main: React.FC<Props> = memo(({ isLoading }) => {
  const { products } = useContext(StateContext);

  return (
    <main className="main">
      <Welcome />
      <ProductsSlider
        title="Brand new models"
        name="models"
        products={selectingProducts(products, 'brand-new')}
        key="models"
        isLoading={isLoading}
      />
      <Categories isLoading={isLoading} />
      <ProductsSlider
        isLoading={isLoading}
        title="Hot prices"
        name="hot"
        products={selectingProducts(products, 'hot')}
        key="hot"
        enableDiscount={true}
      />
    </main>
  );
});
