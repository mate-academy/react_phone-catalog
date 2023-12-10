import { useContext } from 'react';
import { CartItem } from '../../components/CartItem';
import { HistoryButton } from '../../components/HistoryButton';
import { Title } from '../../components/Title';
import './CartPage.scss';
import { ProductsContext } from '../../context/ProductsContext';
import { CartTotal } from '../../components/CartTotal';
import { getTotalPrice } from '../../helpers/getTotalPrice';

export const CartPage = () => {
  const { cart } = useContext(ProductsContext);

  return (
    <div className="CartPage">
      <HistoryButton text="Back" />
      <div className="CartPage__title">
        <Title title="Cart" />
      </div>
      <div className="CartPage__total">
        <CartTotal total={getTotalPrice(cart)} itemsCount={cart.length} />
      </div>
      {cart.map((item) => (
        <CartItem key={item.id} />
      ))}
    </div>
  );
};
