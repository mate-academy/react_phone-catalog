/* eslint-disable max-len */

import Product from '../../../../types/Product';
import Minus from '/img/icons/Minus.svg';
import Plus from '/img/icons/Plus.svg';

type Props = { product: Product };

export const CartItem: React.FC<Props> = ({ product }) => {
  return (
    <div
      className="column  is-flex is-align-items-center is-justify-content-space-between mb-4"
      key={product.id}
    >
      <button type="button" className="delete"></button>
      <img className="image is-64x64" src={product.image} alt={product.name} />
      <p>{product.name}</p>
      <div className="block">
        <button className="">
          <img src={Minus} alt="Minus" />
        </button>
        <span>1</span>
        <button className="">
          <img src={Plus} alt="Plus" />
        </button>
      </div>

      <p className="">${product.fullPrice}</p>
    </div>
  );
};
