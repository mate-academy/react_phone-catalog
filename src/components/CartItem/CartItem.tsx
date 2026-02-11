import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Product } from "../../types/Product";
import './CartItem.scss';
import classNames from "classnames";
import { Link } from "react-router-dom";

const normalize = (str: string) => {
  return str[0].toUpperCase() + str.slice(1);
};

type Props = {
  product: Product;
  quantity: number,
}

export const CartItem: React.FC<Props> = ({ product, quantity }) => {
  const { deleteFromCart, updateQuantity } = useContext(GlobalContext);

  return (
    <div className="cart-item">
      <div className="cart-item__top">
        <div
          className="cart-item__delete"
          onClick={() => deleteFromCart(product.itemId)}
        />
        <Link
          to={`/${product.category}/${product.itemId}`}
          className="cart-item__top-link"
        >
          <div className="cart-item__photo">
            <img src={product.image} alt="cart-photo" />
          </div>
          <div className="cart-item__title">
            {normalize(product.itemId)}
          </div>
        </Link>
      </div>

      <div className="cart-item__bottom">
        <div className="cart-item__btn-block">
          <div
            className={classNames(
              'cart-item__btn',
              'cart-item__btn--dec',
              {'cart-item__btn--active': quantity > 1}
            )}
            onClick={() => {
              if (quantity > 1) {
                updateQuantity(product.itemId, quantity - 1);
              }
            }}
          />
          <span>{quantity}</span>
          <div
            className="cart-item__btn cart-item__btn--inc"
            onClick={() => updateQuantity(product.itemId, quantity + 1)}
          />
        </div>

        <div className="cart-item__price">
          <span>{`$ ${product.price * quantity}`}</span>
        </div>
      </div>
    </div>
  );
}
