import { Cart } from '../components/Cart';
import { BackLink } from '../components/BackLink';

export const CartPage: React.FC = () => {
  return (
    <div className="container">
      <BackLink />
      <Cart />
    </div>
  );
};
