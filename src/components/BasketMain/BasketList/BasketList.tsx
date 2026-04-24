import './BasketList.scss';
import BasketCard from '../BasketCard/BasketCard';
import useAppContext from '../../../useAppContext';

const BasketList = () => {
  const { baskets } = useAppContext();

  return (
    <>
      {' '}
      <div className="basket-list">
        {baskets.map(basketProduct => (
          <BasketCard
            key={basketProduct.itemId}
            basketProduct={basketProduct}
          />
        ))}
      </div>
    </>
  );
};

export default BasketList;
