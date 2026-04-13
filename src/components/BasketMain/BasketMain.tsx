import './BasketMain.scss';
import BasketList from '../BasketList/BasketList';
import BasketCheckout from './BasketCheckout/BasketCheckout';
import { BasketProduct } from '../../types/BasketProduct';

type BasketMainProps = {
  baskets: BasketProduct[];
  setBaskets: React.Dispatch<React.SetStateAction<BasketProduct[]>>;
  removeBaskets: (itemId: string) => void;
};

const BasketMain = ({
  baskets,
  setBaskets,
  removeBaskets,
}: BasketMainProps) => {
  return (
    <>
      <div className="main-basket">
        <h2 className="main-basket__title">Cart</h2>
        <BasketList
          baskets={baskets}
          setBaskets={setBaskets}
          removeBasket={removeBaskets}
        />
        <BasketCheckout baskets={baskets} />
      </div>
    </>
  );
};

export default BasketMain;
