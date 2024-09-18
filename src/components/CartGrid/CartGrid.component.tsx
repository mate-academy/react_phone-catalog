import { ProductSummary } from '../../types/ProductSummary';
import { CartProductCard } from '../CartProductCard/CartProductCard.component';

type Props = {
  cart: ProductSummary[];
};

export const CartGrid: React.FC<Props> = ({ cart }) => {
  return (
    <>
      <div className="cartGrid">
        {cart.map(product => (
          <CartProductCard product={product} key={product.id} />
        ))}
      </div>
    </>
  );
};
