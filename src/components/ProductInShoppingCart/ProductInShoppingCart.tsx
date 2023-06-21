import { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addQuantity, removeProductFromCart, subtractQuantity } from '../../features/shoppingCart/shoppingCartSlice';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Product } from '../../types/product';
import './productInShoppingCart.scss';

interface Props {
  product: Product;
  theme: string;
}

export const ProductInShoppingCart: FC<Props> = ({ product, theme }) => {
  const dispatch = useAppDispatch();
  const [, setShoppingCart]
  = useLocalStorage('shoppingCart', []);
  const shoppingCart = useAppSelector(state => state.shoppingCart.value);
  const { name, image, price, quantity, id } = product;

  const handleCounterClick = (id: number, action: string) => {
    localStorage.setItem('shoppingCart', JSON.stringify(
      shoppingCart.map(prod => {
        if (prod.id !== id) {
          return prod;
        }

        if (action === 'increase') {
          return { ...prod, quantity: prod.quantity + 1 }
        }

        return { ...prod, quantity: prod.quantity - 1 }
      })
    ))

    if (action === 'increase') {
      dispatch(addQuantity(id));
    } else {
      dispatch(subtractQuantity(id));
    }
  }

  const handleRemoveProduct = (id: number) => {
    dispatch(removeProductFromCart(id));
    localStorage.setItem('shoppingCart',
      JSON.stringify(shoppingCart.filter(prod => prod.id !== id)));
  }

  return (
    <div className={`product-in-shopping-cart product-in-shopping-cart--${theme}`}>
      <button
        className='product-in-shopping-cart__delete-product'
        onClick={() => handleRemoveProduct(id)}
      >
        {theme === 'light' ? (
          <img src="/_new/img/icons/close-button-dark.svg" alt="Delete product" />
        ) : (
          <img src="/_new/img/icons/close-button-light.svg" alt="Delete product" />
        )}
      </button>

      <img 
        src={`_new/${image}`} 
        alt="Product"
        className='product-in-shopping-cart__product-image'
      />
      <h2 className={`product-in-shopping-cart__product-name product-in-shopping-cart__product-name--${theme}`}>{name}</h2>

      <div className="product-in-shopping-cart__container">
        <div className="product-in-shopping-cart__counter">
          <button
            onClick={() => handleCounterClick(id, 'decrease')}
            className="product-in-shopping-cart__button"
            disabled={quantity === 1}
            >
              {quantity !== 1 ? (
                theme === 'light' ? (
                  <img src="/_new/img/icons/minus-dark.svg" alt="Minus product" />
                ) : (
                  <img src="/_new/img/icons/minus-light.svg" alt="Minus product" />
                )
              ) : (
                <img src="/_new/img/icons/minus-disabled.svg" alt="Minus product" />
              )}
            </button>
          <p className={`product-in-shopping-cart__quantity product-in-shopping-cart__quantity--${theme}`}>{quantity}</p>
          <button
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
        <h2 className={`product-in-shopping-cart__price product-in-shopping-cart__price--${theme}`}>{`$${price * quantity}`}</h2>
      </div>
    </div>
  )
}
