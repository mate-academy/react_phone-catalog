import { Product } from '../../../../types/Product';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type CartProduct = {
  item: Product;
  quantity: number;
};

type CartItem = {
  item: Product;
  quantity: number;
};

type Props = {
  product: CartProduct;
  setCartState: Dispatch<SetStateAction<CartItem[]>>;
};

export const CartCard: React.FC<Props> = ({ product, setCartState }) => {
  const savedProducts: { item: Product; quantity: number }[] = JSON.parse(
    localStorage.getItem('CartStore') || '[]',
  );

  const currentProduct = product.item;

  const savedProduct = savedProducts.find(
    saveProd => saveProd.item.itemId === currentProduct.itemId,
  );

  const initialQuantity = savedProduct ? savedProduct.quantity : 1;

  const [quantity, setQuantity] = useState<number>(initialQuantity);

  useEffect(() => {
    const storedCart: CartItem[] = JSON.parse(
      localStorage.getItem('CartStore') || '[]',
    );

    const updatedCart = storedCart.map(cartItem => {
      if (cartItem.item.itemId === currentProduct.itemId) {
        return { ...cartItem, quantity };
      }

      return cartItem;
    });

    localStorage.setItem('CartStore', JSON.stringify(updatedCart));
    setCartState(updatedCart);

    window.dispatchEvent(new Event('quantity-update'));
  }, [quantity, currentProduct.itemId, setCartState]);

  const handleDelete = (id: number) => {
    const storedCart: CartItem[] = JSON.parse(
      localStorage.getItem('CartStore') || '[]',
    );

    const updatedCartList = storedCart.filter(item => item.item.id !== id);

    localStorage.setItem('CartStore', JSON.stringify(updatedCartList));
    setCartState(updatedCartList);
    window.dispatchEvent(new Event('delete-update'));
  };

  return (
    <Link
      to={`/${currentProduct.category}/${currentProduct.itemId}`}
      className="cart__card"
    >
      <div className="cart__card--top">
        <div
          className="cart__card-delete"
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            handleDelete(currentProduct.id);
          }}
        >
          <div className="icon--close"></div>
        </div>
        <div className="cart__card-image">
          <img
            className="cart__card-image--photo"
            src={`${currentProduct.image}`}
            alt=""
          />
        </div>

        <div className="cart__card-name">
          <p className="text-body">{currentProduct.name}</p>
        </div>
      </div>

      <div className="cart__card--bottom">
        <div className="cart__card-quantity">
          <div className="cart__card-quantity-button">
            <div
              className={
                quantity === 1 ? 'icon icon-32 icon-deactivate' : 'icon icon-32'
              }
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                if (quantity <= 1) {
                  setQuantity(1);
                } else {
                  setQuantity(quantity - 1);
                }
              }}
            >
              <div className="icon--minus"></div>
            </div>
            <p className="text-body cart__card-quantity-text">{quantity}</p>
            <div
              className="icon icon-32"
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                setQuantity(quantity + 1);
              }}
            >
              <div className="icon--plus"></div>
            </div>
          </div>
        </div>
        <div className="cart__card-price">
          <p className="text-h3 cart__card-price-price">
            ${currentProduct.price * quantity}
          </p>
        </div>
      </div>
    </Link>
  );
};
