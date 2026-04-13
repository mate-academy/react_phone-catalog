import './BasketList.scss';
import BasketCard from '../BasketCard/BasketCard';
import { BasketProduct } from '../../types/BasketProduct';

type BasketListProps = {
  baskets: BasketProduct[];
  setBaskets: React.Dispatch<React.SetStateAction<BasketProduct[]>>;
  removeBasket: (itemid: string) => void;
  handleIncrease: (itemId: string) => void;
  handleDecrease: (itemId: string) => void;
};

const BasketList = ({
  baskets,
  setBaskets,
  removeBasket,
  handleIncrease,
  handleDecrease,
}: BasketListProps) => {
  return (
    <>
      {' '}
      <div className="basket-list">
        {baskets.map(basketProduct => (
          <BasketCard
            key={basketProduct.itemId}
            basketProduct={basketProduct}
            baskets={baskets}
            setBaskets={setBaskets}
            removeBasket={removeBasket}
            handleIncrease={handleIncrease}
            handleDecrease={handleDecrease}
          />
        ))}
      </div>
    </>
  );
};

export default BasketList;
