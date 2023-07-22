import { Cart } from '../components/Cart';
import { HistoryBackPusher } from '../components/HistoryBackPusher';

export const CartPage: React.FC = () => {
  return (
    <div className="container">
      <HistoryBackPusher />
      <Cart />
    </div>
  );
};
