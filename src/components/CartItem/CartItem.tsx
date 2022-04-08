import {
  FunctionComponent,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';

// Styles
import './CartItem.scss';

// Contexts
import { CartContext } from '../../contexts/CartProvider';

// Types
import { Product } from '../../types/Product';

// Components
import { Button } from '../Button';

type Props = {
  product: Product;
  setTotalSum: Dispatch<SetStateAction<number>>;
};

export const CartItem: FunctionComponent<Props> = ({ product, setTotalSum }) => {
  const [count, setCount] = useState<number>(1);
  const { cart, setCart } = useContext(CartContext);
  const totalPrice = count * product.newPrice;

  const handleCart = () => {
    let newCart = [];

    if (cart.includes(product.id)) {
      newCart = cart.filter((cartItem: string) => cartItem !== product.id);
    } else {
      newCart = [...cart, product.id];
    }

    setCart(newCart);
    setTotalSum((totalSum) => totalSum - totalPrice);
  };

  const increase = () => {
    setCount(count + 1);
    setTotalSum((totalSum) => totalSum + product.newPrice);
  };

  const decrease = () => {
    setCount(count - 1);
    setTotalSum((totalSum) => totalSum - product.newPrice);
  };

  return (
    <div className="CartItem">
      <div className="CartItem__leftSide">
        <Button
          disablet={false}
          classModificator="Button--close"
          callback={handleCart}
        />

        <img
          src={product.imageUrl}
          alt="Gadget"
          className="CartItem__image"
        />

        <p>{product.name}</p>
      </div>

      <div className="CartItem__rightSide">
        <div className="CartItem__buttons">
          <Button
            classModificator="Button--minus"
            callback={decrease}
            disablet={count === 1}
          />

          <span>{count}</span>

          <Button
            disablet={false}
            classModificator="Button--plus"
            callback={increase}
          />
        </div>

        <h2>{`$${totalPrice}`}</h2>
      </div>
    </div>
  );
};
