import './Cart.scss';
import { useAppContext } from '../../context/context';
import { BackLinkButton } from '../../components/Elements/BackLinkButton';

export const CartPage = () => {
  const { cart } = useAppContext();

  return (
    <div className="cart">
      <BackLinkButton />

      <h1 className="cart__title">Cart</h1>

      {!cart.length ? (
        <div className="cart--empty" />
      ) : (
        // <ProductList products={cart} />
        <span></span>
      )}
    </div>
  );
};
