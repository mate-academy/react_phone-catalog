import { FunctionComponent, Dispatch, SetStateAction } from 'react';

// Styles
import './CartList.scss';

// Types
import { Product } from '../../types/Product';

// Components
import { CartItem } from '../CartItem';

type Props = {
  products: Product[];
  setTotalSum: Dispatch<SetStateAction<number>>;
};

export const CartList: FunctionComponent<Props> = ({ products, setTotalSum }) => {
  return (
    <ul className="CartList">
      {products.map((product: Product) => (
        <li key={product.id}>
          <CartItem product={product} setTotalSum={setTotalSum} />
        </li>
      ))}
    </ul>
  );
};
