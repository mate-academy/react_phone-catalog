import './cartItem.scss';
import { useCallback, useEffect, useState } from 'react';
import { Product } from '../../type/product';

type Props = {
  product: Product,
  setTotalCost: React.Dispatch<React.SetStateAction<number>>,
  setTotalItems: React.Dispatch<React.SetStateAction<number>>,
};

export const CartItem: React.FC<Props> = ({
  product,
  setTotalCost,
  setTotalItems,
}) => {
  const [numbers, setNumbers] = useState(1);
  const {
    name,
    price,
    discount,
    imageUrl,
  } = product;

  const realPrice = numbers * (price * ((100 - discount) / 100));

  const deleteProduct = useCallback(() => {
    const productsList = window.localStorage.getItem('cart');

    if (!productsList) {
      window.localStorage.setItem('cart', JSON.stringify([product]));
      window.dispatchEvent(new Event('storage'));

      return;
    }

    const newProductsList = JSON.parse(productsList);

    for (let i = 0; i < newProductsList.length; i += 1) {
      if (newProductsList[i].id === product.id) {
        const cartList = [...newProductsList];

        cartList.splice(i, 1);
        const cleanedList = [...cartList];

        window.localStorage.setItem('cart', JSON.stringify([...cleanedList]));
        window.dispatchEvent(new Event('storage'));
        setTotalCost((prev: number) => prev - realPrice);
        setTotalItems((prev) => prev - numbers);

        return;
      }
    }

    window.localStorage.setItem(
      'cart', JSON.stringify([...newProductsList, product]),
    );
    window.dispatchEvent(new Event('storage'));
  }, [product, numbers]);

  const decreaseProducts = useCallback(() => {
    setNumbers((prev) => prev - 1);
    setTotalItems((prev) => prev - 1);
    setTotalCost((prev) => prev - realPrice);
  }, []);

  const increaseProducts = useCallback(() => {
    setNumbers((prev) => prev + 1);
    setTotalItems((prev) => prev + 1);
    setTotalCost((prev) => prev + realPrice);
  }, []);

  useEffect(() => {
    setTotalCost((prev: number) => prev + realPrice);
  }, []);

  useEffect(() => {
    setTotalItems((prev) => prev + numbers);
  }, []);

  return (
    <li className="cart-item">
      <button
        className="cart-item__delete"
        type="button"
        aria-label="delete item"
        onClick={deleteProduct}
      />

      <div className="cart-item__image-wrapper">
        <img
          className="cart-item__image"
          src={imageUrl}
          alt="product"
        />
      </div>

      <p className="cart-item__name">
        {name}
      </p>

      <div className="cart-item__quantity-items">
        <button
          className="cart-item__decrease"
          type="button"
          aria-label="decrease"
          onClick={decreaseProducts}
          disabled={!numbers}
        />

        <div
          className="cart-item__quantity"
          data-cy="productQuantity"
        >
          {numbers}
        </div>

        <button
          className="cart-item__increase"
          type="button"
          aria-label="increase"
          onClick={increaseProducts}
        />
      </div>

      <div className="cart-item__price">
        {`$${realPrice}`}
      </div>
    </li>
  );
};
