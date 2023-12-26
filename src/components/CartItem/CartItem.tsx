import classNames from 'classnames';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../../helpers/ProductsContext';
import { Product } from '../../helpers/types';
import { useLocalStorsge } from '../../hooks/useLocalStorage';
import './CartItem.scss';

type Props = {
  product: Product,
};

export const CartItem: React.FC<Props> = ({
  product,
}) => {
  const {
    cartPrices, setCartPrices, addedToCart,
    setTotalPrices, addToCartHandler,
  } = useContext(ProductContext);

  const [amountOfProduct, setAmountOfProduct]
    = useLocalStorsge<number>(`${product.phoneId}amount`, 1);

  useEffect(() => {
    const cartItem = cartPrices.find(obj => obj.phoneId === product.phoneId);

    if (cartItem) {
      const newCartPrices = [...cartPrices];
      const index = newCartPrices.indexOf(cartItem);

      newCartPrices[index].amount = amountOfProduct;

      setCartPrices(newCartPrices);
    } else {
      const newCartPrices = [...cartPrices, {
        phoneId: product.phoneId,
        price: product.price,
        amount: amountOfProduct,
      }];

      setCartPrices(newCartPrices);
    }

    const newValue = cartPrices
      .map(obj => obj.price * obj.amount)
      .reduce((sum, i) => sum + i, 0);

    setTotalPrices(newValue);
  }, [amountOfProduct, addedToCart]);

  return (
    <article className="cart-item">
      <div className="cart-item__right">
        <button
          aria-label="remove item"
          type="button"
          className="cart-item__remove-btn"
          onClick={() => addToCartHandler(product.phoneId)}
          data-cy="cartDeleteButton"
        />

        <div className="cart-item__img-container">
          <img
            src={product.image}
            alt={product.name}
            className="cart-item__img"
          />
        </div>
        <Link to={`/${product.category}/${product.itemId}`} className="cart-item__item-link">
          <p className="cart-item__name">
            {product.name}
          </p>
        </Link>
      </div>
      <div className="cart-item__change-amount">
        <button
          aria-label="decrease amount"
          type="button"
          className={classNames(
            'cart-item__btn cart-item__btn--min',
            { 'cart-item__btn--min--disabled': amountOfProduct === 1 },
          )}
          onClick={() => setAmountOfProduct(amountOfProduct - 1)}
        />
        <p className="cart-item__amount" data-cy="productQauntity">
          {amountOfProduct}
        </p>
        <button
          aria-label="increase amount"
          type="button"
          className="cart-item__btn cart-item__btn--plus"
          onClick={() => setAmountOfProduct(amountOfProduct + 1)}
        />
      </div>

      <p className="cart-item__price">{`$${product.price * amountOfProduct}`}</p>
    </article>
  );
};
