import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addToCart } from '../../features/cartItemsSlice';
import {
  addToFavourites,
  removeFromFavourites,
} from '../../features/favouriteItemsSlice';
import { Product } from '../../types/Product';
import { getProductDiscount } from '../../utils/getProductDiscount';

import './ProductCard.scss';

const IMG_SIZE = 208;

type Props = {
  product: Product
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();

  const { cartItems } = useAppSelector(state => state.cartItems);
  const isItemInCart = useMemo(() => {
    return cartItems.some(item => item.id === product.id);
  }, [cartItems]);

  const addProductToCart = () => dispatch(
    addToCart(
      {
        id: product.id,
        product,
        quantity: 1,
      },
    ),
  );

  const { favouriteItems } = useAppSelector(state => state.favouriteItems);
  const isItemInFavourites = useMemo(() => {
    return favouriteItems.some(item => item.id === product.id);
  }, [favouriteItems]);

  const toggleFavoriteProduct = () => {
    if (isItemInFavourites) {
      dispatch(removeFromFavourites(product.id));

      return;
    }

    dispatch(addToFavourites(product));
  };

  const {
    imageUrl,
    name,
    price,
    screen,
    capacity,
    ram,
    id,
    type,
  } = product;

  const discountPrice = useMemo(() => {
    return getProductDiscount(product);
  }, [product]);

  const productDetailsPath = `/${type}s/${id}`;

  return (
    <article className="ProductCard">
      <div className="ProductCard-ImgContainer">
        <Link to={productDetailsPath}>
          <img
            className="ProductCard-Img"
            src={imageUrl}
            alt="ProductCard"
            width={IMG_SIZE}
            height={IMG_SIZE}
            loading="eager"
            decoding="async"
          />
        </Link>
      </div>

      <div className="ProductCard-Content">
        <Link to={productDetailsPath}>
          <h2 className="ProductCard-Title">{name}</h2>
        </Link>

        <div className="ProductCard-Prices">
          <span className="ProductCard-DiscountPrice">
            {`$${discountPrice}`}
          </span>

          {discountPrice !== price
            && (
              <span className="ProductCard-Price">
                {`$${price}`}
              </span>
            )}
        </div>

        <hr className="ProductCard-Break" />

        <div className="ProductCard-Specs">
          <div className="ProductCard-Spec">
            <span className="ProductCard-SpecText">Screen</span>
            <span className="ProductCard-SpecValue">{screen}</span>
          </div>

          <div className="ProductCard-Spec">
            <span className="ProductCard-SpecText">Capacity</span>
            <span className="ProductCard-SpecValue">{capacity}</span>
          </div>

          <div className="ProductCard-Spec">
            <span className="ProductCard-SpecText">RAM</span>
            <span className="ProductCard-SpecValue">{ram}</span>
          </div>
        </div>

        <div className="ProductCard-Buttons">
          <button
            className={cn(
              'ProductCard-Button',
              'Button',
              { Button_in_cart: isItemInCart },
            )}
            type="button"
            disabled={isItemInCart}
            onClick={addProductToCart}
          >
            {isItemInCart
              ? 'Added to cart'
              : 'Add to cart'}
          </button>

          <button
            className={cn(
              'ProductCard-Icon Icon',
              {
                Icon_heart: !isItemInFavourites,
                Icon_heart_in_favoutites: isItemInFavourites,
              },
            )}
            type="button"
            aria-label="Heart"
            onClick={toggleFavoriteProduct}
          />
        </div>
      </div>
    </article>
  );
};
