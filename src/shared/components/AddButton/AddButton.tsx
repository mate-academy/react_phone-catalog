import { useProducts } from '../../utils/ProductsContext';
import cn from 'classnames';
import s from './AddButton.module.scss';
import { ProductItem } from '../../../types/ProductItem';
import { Product } from '../../../types/Product';
import { normalizeProduct } from '../../utils/normalizeProduct';
import { CartProduct } from '../../../types/CartProduct';

type Props = {
  product: ProductItem | Product;
};

export const AddButton: React.FC<Props> = ({ product }) => {
  const {
    favourites,
    addToFavourites,
    removeFromFavourites,
    shoppingBag,
    addToShoppingBag,
    removeFromShoppingBag,
  } = useProducts();

  const normalizedProduct = normalizeProduct(product);

  if (!normalizedProduct || !normalizedProduct.id) {
    return null;
  }

  const productWithCount: CartProduct = {
    ...normalizedProduct,
    count: 1,
  };

  const isFavourite = favourites.some(
    (item: CartProduct) => item.id === productWithCount.id,
  );
  const isInCart = shoppingBag.some(
    (item: CartProduct) => item.id === productWithCount.id,
  );

  return (
    <div className={s.button_field}>
      <button
        type="button"
        className={cn(s.button, s['add-button'], {
          [s['in-cart']]: isInCart,
        })}
        onClick={() => {
          if (isInCart) {
            removeFromShoppingBag(productWithCount.id);
          } else {
            addToShoppingBag(productWithCount);
          }
        }}
      >
        {isInCart ? 'Added to cart' : 'Add to cart'}
      </button>

      <button
        type="button"
        className={cn(s.button, s['fav-button'], {
          [s['is-favourite']]: isFavourite,
        })}
        onClick={() => {
          if (isFavourite) {
            removeFromFavourites(productWithCount.id);
          } else {
            addToFavourites(productWithCount);
          }
        }}
      >
        <div className={s.FavouritesImage}></div>
      </button>
    </div>
  );
};
