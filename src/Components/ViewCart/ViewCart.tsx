import './ViewCart.scss';
// import { NavLink } from 'react-router-dom';
// import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../types/Product';
import { useEffect, useState } from 'react';
// import { Gadget } from '../../types/Gadget';
// import { useEffect, useState } from 'react';
// import { Product } from '../../types/Product';
// import { GetProducts } from '../../services/GetProducts';
// import { useCart } from '../../context/cartContext';

type Props = {
  product: Product;
  onRemove: (id: string) => void;
  updateCounter: (id: string, value: number) => void;
  counter: number;
  UpdateTotalPrice: (id: string) => void;
  addedToCart: Product[];
};

export const ViewCart: React.FC<Props> = ({
  product,
  onRemove,
  updateCounter,
  counter,
  UpdateTotalPrice,
  addedToCart,
}) => {
  const deleteCounter = () => {
    updateCounter(product.itemId, 0);
    onRemove(product.itemId);
  };

  useEffect(() => {
    addedToCart.forEach((element: Product) => {
      UpdateTotalPrice(element.itemId);
    });
  }, [addedToCart]);

  return (
    <>
      <div className="view-cart">
        <img
          className="view-cart__close"
          src="public/img/ui-kit/Close.png"
          alt="close"
          onClick={() => {
            deleteCounter();
            UpdateTotalPrice(product.itemId);
          }}
        />

        <img
          className="view-cart__photo"
          src={product.image}
          alt="product-photo"
        />

        <h1 className="view-cart__title">{product.name}</h1>

        <div className="view-cart__buttons">
          <img
            className="view-cart__button"
            src="public/img/ui-kit/cart-button-minus.png"
            alt="-"
            onClick={() => {
              const newValue = Math.max(0, counter - 1);

              updateCounter(product.itemId, newValue);
              UpdateTotalPrice(product.itemId);
              if (newValue === 0) {
                deleteCounter();
              }
            }}
          />

          <p className="view-cart__counter">{counter}</p>

          <img
            className="view-cart__button"
            src="public/img/ui-kit/cart-button-plus.png"
            alt="+"
            onClick={() => {
              updateCounter(product.itemId, counter + 1);
              UpdateTotalPrice(product.itemId);
            }}
          />
        </div>

        <div className="view-cart__price">${product.price * counter}</div>
      </div>
    </>
  );
};
