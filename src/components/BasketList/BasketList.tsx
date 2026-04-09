import './BasketList.scss';
import { FavoriteProduct } from '../../types/FavoriteProduct';
import BasketCard from '../BasketCard/BasketCard';

type BasketListProps = {
  baskets: FavoriteProduct[];
  setBaskets: React.Dispatch<React.SetStateAction<FavoriteProduct[]>>;
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
          />
        ))}
      </div>
    </>
  );
};

export default BasketList;
