import './BasketList.scss';
import BasketCard from '../BasketCard/BasketCard';
import { BasketProduct } from '../../types/BasketProduct';

type BasketListProps = {
  baskets: BasketProduct[];
  setBaskets: React.Dispatch<React.SetStateAction<BasketProduct[]>>;
  removeBasket: (itemid: string) => void;
};

const BasketList = ({ baskets, setBaskets, removeBasket }: BasketListProps) => {
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
          />
        ))}
      </div>
    </>
  );
};

export default BasketList;
