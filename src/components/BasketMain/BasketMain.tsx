import './BasketMain.scss';
import BasketList from '../BasketList/BasketList';
import BasketCheckout from './BasketCheckout/BasketCheckout';
import { FavoriteProduct } from '../../types/FavoriteProduct';

type BasketMainProps = {
  baskets: FavoriteProduct[];
  setBaskets: React.Dispatch<React.SetStateAction<FavoriteProduct[]>>;
};

const BasketMain = ({ baskets, setBaskets }: BasketMainProps) => {
  return (
    <>
      <div className="main-basket">
        <h2 className="main-basket__title">Cart</h2>
        <BasketList baskets={baskets} setBaskets={setBaskets} />
        <BasketCheckout />
      </div>
    </>
  );
};

export default BasketMain;
