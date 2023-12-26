import cn from 'classnames';
import { Product } from '../../types/product';
import '../ProductCard/Product.scss';
import * as favouriteActions from '../features/FavouritesSlicer';
import * as cartActions from '../features/CartSlicer';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

type Props = {
  product: Product;
};

export const ActionButtonsDetail: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();

  const favouriteProducts = useAppSelector(state => state.favourites.items);

  const cartProducts = useAppSelector(state => state.cartProducts.items);

  const isFavourite = favouriteProducts.some(
    (favProduct) => favProduct.phoneId === product.phoneId,
  );

  const isCart = cartProducts.some(
    (cartProduct) => cartProduct.phoneId === product.phoneId,
  );

  const handleAddFavourite = (newProduct: Product) => {
    if (isFavourite) {
      dispatch(favouriteActions.deleteFavouritesProducts(newProduct.id));
    } else {
      dispatch(favouriteActions.setFavouritesProducts(newProduct));
    }
  };

  const handleAddProduct = (newProduct: Product) => {
    if (isCart) {
      dispatch(cartActions.deleteCartProducts(newProduct.id));
    } else {
      dispatch(cartActions.setCartProducts(newProduct));
    }
  };

  return (
    <div className="product__button-container_detail">
      <button
        type="button"
        className={cn('product__button-add_detail',
          { 'product__button-add_detail-active': isCart })}
        onClick={() => handleAddProduct(product)}

      >
        Add to card
      </button>
      <button
        type="button"
        aria-label="addFavourite"
        className={cn('product__button-favorite_detail',
          { 'product__button-favorite_detail-active': isFavourite })}
        onClick={() => handleAddFavourite(product)}
      />
    </div>
  );
};
