/* eslint-disable jsx-a11y/control-has-associated-label */
import { useProducts } from '../../../../context';
import { Product } from '../../../../types';
import { AddItems } from '../AddItems';
import './CartItem.scss';

type Props = {
  product: Product,
  totalPrice: number,
  setTotalPrice: (price: number) => void,
};

export const CartItem: React.FC<Props> = ({
  product,
  totalPrice,
  setTotalPrice,
}) => {
  const { cart, setToCart } = useProducts();

  const handleDeleteItem = () => {
    const newItems = cart.filter(item => item.itemId !== product.itemId);

    const newTotalPrice = totalPrice - product.price;

    setTotalPrice(newTotalPrice);
    setToCart(newItems);
  };

  return (
    <>
      {product && (
        <div className="cart-item">
          <button
            type="button"
            className="cart-item__btn"
            onClick={handleDeleteItem}
          />

          <img
            alt={product?.name}
            src={`./_new/${product?.image}`}
            className="cart-item__img"
          />

          <h2
            className="cart-item__title"
          >
            {product.name}
          </h2>

          <div className="cart-item__add-items-container">
            <AddItems
              totalPrice={totalPrice}
              setTotalPrice={setTotalPrice}
              product={product}
            />
          </div>

          <p className="cart-item__price">{`${product.price}$`}</p>
        </div>
      )}
    </>
  );
};
