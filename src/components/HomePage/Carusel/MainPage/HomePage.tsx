import { Product } from '../../../../helpers/Product';

import { Carousel } from '../../../Carusel/Carusel';
import { Category } from '../../../Category/Category';
import { ProductSlider } from '../../../ProductSlider';

import './HomePage.scss';

type Props = {
  products: Product[];
  onLikeClick: (product: Product) => void;
  likeProduct: Product[];
  addProduct: Product[];
  onAddtoChart: (product: Product) => void;
};

export const HomePage: React.FC<Props> = ({
  products,
  onLikeClick,
  likeProduct,
  addProduct,
  onAddtoChart,
}) => {
  return (
    <div className="home">
      <Carousel />

      <ProductSlider
        products={products}
        filterBy=""
        title="Hot prices"
        onLikeClick={onLikeClick}
        likeProduct={likeProduct}
        addProduct={addProduct}
        onAddtoChart={onAddtoChart}
      />

      <Category product={products} />

      <ProductSlider
        products={products}
        filterBy="year"
        title="Brand new models"
        onLikeClick={onLikeClick}
        likeProduct={likeProduct}
        addProduct={addProduct}
        onAddtoChart={onAddtoChart}
      />
    </div>
  );
};
