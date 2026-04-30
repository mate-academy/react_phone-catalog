import './BasketList.scss';
import BasketCard from '../BasketCard/BasketCard';
import useAppContext from '../../../useAppContext';

const BasketList = () => {
  const { baskets } = useAppContext();

  if (baskets.length === 0) {
    return null;
  }

  return (
    <div className="basket-list">
      {baskets.map(basketProduct => (
        <BasketCard key={basketProduct.itemId} basketProduct={basketProduct} />
      ))}
    </div>
  );
};

export default BasketList;
