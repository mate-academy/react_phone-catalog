import { ProductLogic } from '../ProductLogic/ProductLogic';

import { Product } from '../../helpers/Product';

type Props = {
  products: Product[];
  onLikeClick: (product: Product) => void;
  likeProduct: Product[];
  addProduct: Product[];
  onAddtoChart: (product: Product) => void;
};

export const TabletPage: React.FC<Props> = ({
  products,
  onLikeClick,
  likeProduct,
  addProduct,
  onAddtoChart,
}) => (
  <div className="main">
    <ProductLogic
      products={products}
      category="tablets"
      title="Tablets"
      onLikeClick={onLikeClick}
      likeProduct={likeProduct}
      addProduct={addProduct}
      onAddtoChart={onAddtoChart}
    />
  </div>
);
