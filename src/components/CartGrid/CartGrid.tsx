import { useContext } from 'react';
import { StatesContext } from '../../base/store/GlobalStateProvider';
import { CartProductCard } from '../CartProductCard/CartProductCard';

export const CartGrid: React.FC = () => {
  const { cart } = useContext(StatesContext);

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
