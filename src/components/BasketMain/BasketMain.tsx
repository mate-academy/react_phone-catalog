import './BasketMain.scss';
import BasketList from './BasketList/BasketList';
import BasketCheckout from './BasketCheckout/BasketCheckout';

const BasketMain = () => {
  return (
    <>
      <div className="main-basket">
        <h2 className="main-basket__title">Cart</h2>
        <BasketList />
        <BasketCheckout />
      </div>
    </>
  );
};

export default BasketMain;
