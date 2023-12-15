/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable object-curly-newline */
import { Link } from 'react-router-dom';
import { useContext, useCallback, useMemo } from 'react';
import cn from 'classnames';
import { MainContext } from '../../context/MainContext';
import { Product } from '../../types/Product';
import { CartItem } from '../../types/CartItem';

interface Props {
  item: Product;
}

export const ProductCard: React.FC<Props> = ({ item }) => {
  const { cartItems, setCartItems } = useContext(MainContext);

  const isBtnActive = useMemo(() => {
    return cartItems.some((cartItem) => cartItem.product.id === item.id);
  }, [item, cartItems]);

  const addToCard = useCallback(
    (selectedProduct: Product) => {
      const cartItem: CartItem = {
        id: selectedProduct.id,
        quantity: 1,
        product: selectedProduct,
      };

      setCartItems((prevState) => {
        if (!isBtnActive) {
          return [...prevState, cartItem];
        }

        return prevState.filter((prevItem) => prevItem.id !== cartItem.id);
      });
    },
    [isBtnActive]
  );

  return (
    <div className="product-card">
      <Link to={`/phones/${item.itemId}`} className="product-card__imgs">
        <picture>
          <img
            className="product-card__img"
            src={item.image}
            alt={item.name}
            loading="lazy"
          />
        </picture>
      </Link>

      <div className="product-card__cont">
        <Link to={`/phones/${item.itemId}`} className="text product-card__name">
          {item.name}
        </Link>

        <div className="product-card__prices">
          <h2 className="h2 product-card__price">{item.price}</h2>
          <h2 className="h2 product-card__price product-card__price--old">
            {item.fullPrice}
          </h2>
        </div>

        <div className="text text--size-2 product-card__infos">
          <div className="product-card__info">
            <p className="product-card__label">Screen</p>
            <p>{item.screen}</p>
          </div>
          <div className="product-card__info">
            <p className="product-card__label">Capacity</p>
            <p>{item.capacity}</p>
          </div>
          <div className="product-card__info">
            <p className="product-card__label">RAM</p>
            <p>{item.ram}</p>
          </div>
        </div>

        <div className="product-card__btns">
          <button
            type="button"
            className={cn('btn', { 'btn--active': isBtnActive })}
            onClick={() => addToCard(item)}
          >
            {isBtnActive ? 'Added to cart' : 'Add to cart'}
          </button>
          <button type="button" className="like-btn">
            <img
              className="like-btn__icon"
              src="./img/like.svg"
              alt="like-btn"
              loading="lazy"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
