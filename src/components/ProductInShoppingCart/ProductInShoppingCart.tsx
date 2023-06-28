import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
// eslint-disable-next-line max-len
import { addQuantity, removeProductFromCart, subtractQuantity } from '../../features/shoppingCart/shoppingCartSlice';
import { Product } from '../../types/product';
import './productInShoppingCart.scss';

interface Props {
  product: Product;
  theme: string;
  finalPrice: number;
}

export const ProductInShoppingCart: FC<Props> = ({ product, theme, finalPrice }) => {
  const dispatch = useAppDispatch();
  const shoppingCart = useAppSelector(state => state.shoppingCart.value);
  const {
    name, image, quantity, id, images, category
  } = product;

  const handleCounterClick = (productId: number, action: string) => {
    localStorage.setItem('shoppingCart', JSON.stringify(
      shoppingCart.map(prod => {
        if (prod.id !== productId) {
          return prod;
        }

        if (action === 'increase') {
          return { ...prod, quantity: prod.quantity + 1 };
        }

        return { ...prod, quantity: prod.quantity - 1 };
      }),
    ));

    if (action === 'increase') {
      dispatch(addQuantity(productId));
    } else {
      dispatch(subtractQuantity(productId));
    }
  };

  const handleRemoveProduct = (productId: number) => {
    dispatch(removeProductFromCart(productId));
    localStorage.setItem('shoppingCart',
      JSON.stringify(shoppingCart.filter(prod => prod.id !== productId)));
  };

  const renderMinusImage = () => {
    if (theme === 'light') {
      return (
        <img
          src="/_new/img/icons/minus-dark.svg"
          alt="Minus product"
        />
      );
    }

    return (
      <img
        src="/_new/img/icons/minus-light.svg"
        alt="Minus product"
      />
    );
  };

  return (
    <div className={`product-in-shopping-cart product-in-shopping-cart--${theme}`}>
      <button
        type="button"
        className="product-in-shopping-cart__delete-product"
        onClick={() => handleRemoveProduct(id)}
      >
        {theme === 'light' ? (
          <img
            src="/_new/img/icons/close-button-dark.svg"
            alt="Delete product"
          />
        ) : (
          <img
            src="/_new/img/icons/close-button-light.svg"
            alt="Delete product"
          />
        )}
      </button>

    {images ? (
      <img
        src={`_new/${images[0]}`}
        alt="Product"
        className="product-in-shopping-cart__product-image"
      /> 
    ) : (
      <img
        src={`_new/${image}`}
        alt="Product"
        className="product-in-shopping-cart__product-image"
      />
    )}
      <Link 
        to={`/${category || 'phones'}/${name.toLowerCase().split(' ').join('-')}`} 
        className={`product-in-shopping-cart__product-name product-in-shopping-cart__product-name--${theme}`}>
        {name}
      </Link>

      <div className="product-in-shopping-cart__container">
        <div className="product-in-shopping-cart__counter">
          <button
            type="button"
            onClick={() => handleCounterClick(id, 'decrease')}
            className={classNames('product-in-shopping-cart__button', {
              [`product-in-shopping-cart__button--disabled__${theme}`]: quantity === 1,
            })}
            disabled={quantity === 1}
          >
            {quantity !== 1 ? (
              renderMinusImage()
            ) : (
              <img
                src="/_new/img/icons/minus-disabled.svg"
                alt="Minus product"
              />
            )}
          </button>
          <p className={`product-in-shopping-cart__quantity product-in-shopping-cart__quantity--${theme}`}>{quantity}</p>
          <button
            type="button"
            onClick={() => handleCounterClick(id, 'increase')}
            className="product-in-shopping-cart__button"
          >
            {theme === 'light' ? (
              <img src="/_new/img/icons/plus-dark.svg" alt="Minus product" />
            ) : (
              <img src="/_new/img/icons/plus-light.svg" alt="Minus product" />
            )}
          </button>
        </div>
        <h2 className={`product-in-shopping-cart__price product-in-shopping-cart__price--${theme}`}>
          {`$${finalPrice * quantity}`}
        </h2>
      </div>
    </div>
  );
};
