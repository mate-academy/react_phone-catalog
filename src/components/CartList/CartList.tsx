import './cartList.scss';
import { CartItem } from '../CartItem';
import { Product } from '../../type/product';

type Props = {
  products: Product[],
  setTotalCost: React.Dispatch<React.SetStateAction<number>>,
  setTotalItems: React.Dispatch<React.SetStateAction<number>>,
};

export const CartList: React.FC<Props> = ({
  products,
  setTotalCost,
  setTotalItems,
}) => {
  return (
    <ul className="cart-list">
      {products.map((product) => (
        <CartItem
          key={product.id}
          product={product}
          setTotalCost={setTotalCost}
          setTotalItems={setTotalItems}
        />
      ))}
    </ul>
  );
};
