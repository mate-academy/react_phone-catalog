import './Basket.scss';
import BasketMain from '../../components/BasketMain/BasketMain';
import { FavoriteProduct } from '../../types/FavoriteProduct';
import { BasketProduct } from '../../types/BasketProduct';

type BasketProps = {
  favorites: FavoriteProduct[];
  baskets: BasketProduct[];
  setBaskets: React.Dispatch<React.SetStateAction<BasketProduct[]>>;
  removeBaskets: (itemId: string) => void;
  handleIncrease: (itemId: string) => void;
  handleDecrease: (itemId: string) => void;
};

const Basket = ({
  baskets,
  setBaskets,
  removeBaskets,
  handleIncrease,
  handleDecrease,
}: BasketProps) => {
  return (
    <div className="basket">
      <BasketMain
        baskets={baskets}
        setBaskets={setBaskets}
        removeBaskets={removeBaskets}
        handleIncrease={handleIncrease}
        handleDecrease={handleDecrease}
      />
    </div>
  );
};

export default Basket;
