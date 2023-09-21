import './ProductCardActions.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addItem, removeItem } from '../../redux/reducers/cartReducer';
import {
  addFavourite,
  removeFavourite,
} from '../../redux/reducers/favouritesReducer';
import { Product } from '../../types/Product';
import { LikeIcon } from '../likeIcon/LikeIcon';

type ProductCardActionsProps = {
  product: Product | null;
};

export const ProductCardActions: React.FC<ProductCardActionsProps> = ({
  product,
}) => {
  const dispatch = useAppDispatch();
  const favouriteItems = useAppSelector(state => state.favourites.list);
  const cartItems = useAppSelector(state => state.cart.items);

  const isProductValid = product !== null && typeof product === 'object';

  const isFavourite = isProductValid
    ? favouriteItems.some(
      (favProduct) => favProduct && favProduct.id === product?.id,
    )
    : false;

  const isAddedToCart = isProductValid
    ? cartItems.some((itemCart) => itemCart && itemCart.id === product?.id)
    : false;

  const toggleCart = () => {
    if (isProductValid) {
      if (isAddedToCart) {
        dispatch(removeItem(product));
      } else {
        dispatch(addItem(product));
      }
    }
  };

  const toggleFavorite = () => {
    if (isProductValid) {
      if (isFavourite) {
        dispatch(removeFavourite(product));
      } else {
        dispatch(addFavourite(product));
      }
    }
  };

  const buttonClass = isAddedToCart
    ? `product-card-actions__cart-button
       product-card-actions__cart-button-added`
    : `product-card-actions__cart-button
      product-card-actions__cart-button-notAdded`;

  return (
    <div className="product-card-actions__buttons" style={{ width: '100%' }}>
      <button
        type="button"
        className={buttonClass}
        onClick={toggleCart}
      >
        {isAddedToCart ? 'Added to cart' : 'Add to cart'}
      </button>
      <button type="button" className="product-card-actions__favourites-button">
        <LikeIcon initialValue={isFavourite} onClick={toggleFavorite} />
      </button>
    </div>
  );
};
