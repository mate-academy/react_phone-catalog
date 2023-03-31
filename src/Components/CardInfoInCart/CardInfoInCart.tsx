import { FC } from 'react';
import { Product } from '../../helpers/types/Product';

type Props = {
  product: {
    amount: number;
    item: Product;
  },
  onRemove: (deleteProduct: Product) => void,
  onChangeAmount: (id: string, offer: string) => void,
};

export const CardInfoInCart: FC<Props> = ({
  product,
  onRemove,
  onChangeAmount,
}) => (
  <>
    {/* eslint-disable-next-line */}
    <button
      onClick={() => onRemove(product.item)}
      type="button"
      className="cart__buttonCross"
      data-cy="cartDeleteButton"
    />
    <img
      src={product.item.imageUrl}
      alt={product.item.id}
      className="cart__image"
    />
    <p className="cart__title">{product.item.name}</p>
    <div className="cart__changeAmount">
      {/* eslint-disable-next-line */}
      <button
        type="button"
        className="icon icon--minus cart__button"
        onClick={() => onChangeAmount(product.item.id, 'incr')}
        disabled={product.amount === 1}
      />
      <p
        className="cart__amount"
        data-cy="productQauntity"
      >
        {product.amount}
      </p>
      {/* eslint-disable-next-line */}
      <button
        type="button"
        className="icon icon--plus cart__button"
        onClick={() => onChangeAmount(product.item.id, 'decr')}
      />
    </div>
    <p className="cart__price">{`$${product.item.price}`}</p>
  </>
);
