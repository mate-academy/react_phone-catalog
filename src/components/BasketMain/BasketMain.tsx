import './BasketMain.scss';
import BasketList from '../BasketList/BasketList';
import BasketCheckout from './BasketCheckout/BasketCheckout';
import { BasketProduct } from '../../types/BasketProduct';

type BasketMainProps = {
  baskets: BasketProduct[];
  setBaskets: React.Dispatch<React.SetStateAction<BasketProduct[]>>;
};

const BasketMain = ({ baskets, setBaskets }: BasketMainProps) => {
  return (
    <>
      <div className="main-basket">
        <h2 className="main-basket__title">Cart</h2>
        <BasketList baskets={baskets} setBaskets={setBaskets} />
        <BasketCheckout baskets={baskets} />
      </div>
    </>
  );
};

export default BasketMain;
