import './BasketList.scss';
import BasketCard from '../BasketCard/BasketCard';
import { BasketProduct } from '../../types/BasketProduct';

type BasketListProps = {
  baskets: BasketProduct[];
  setBaskets: React.Dispatch<React.SetStateAction<BasketProduct[]>>;
};

const BasketList = ({ baskets, setBaskets }: BasketListProps) => {
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
          />
        ))}
      </div>
    </>
  );
};

export default BasketList;
