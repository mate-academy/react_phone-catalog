import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setCartList, setFavoritesList } from '../../../features/productSlice';
import { Product } from '../../../features/types/Product';
import cl from './AddToFavCartButton.module.scss';

const textContent = {
  added: {
    en: 'Added to cart',
    ua: 'В кошику',
  },
  add: {
    en: 'Add to cart',
    ua: 'Додати в кошик',
  },
};

type Props = {
  product: Product;
  height: '40px' | '48px'; // buttons appeared to be the same but on card height is 40 and on product page is 48
  className?: string; // for outer positioning
};

export const AddToFavCartButton: React.FC<Props> = ({
  product,
  height,
  className,
}) => {
  const dispatch = useAppDispatch();
  const { favoritesList, cartList } = useAppSelector(st => st.products);
  const { language } = useAppSelector(st => st.global);

  const isProductAddedToFav = favoritesList.some(fav => fav.id === product.id);
  const isProductAddedToCart = cartList.some(car => car.id === product.id);

  function handleAddAndRemoveFromFavList() {
    if (isProductAddedToFav) {
      dispatch(
        setFavoritesList(favoritesList.filter(fav => fav.id !== product.id)),
      );
    } else {
      dispatch(setFavoritesList([...favoritesList, product]));
    }
  }

  function handleAddAndRemoveFromCart() {
    const productWithQuantity = { ...product, quantity: 1 };

    if (isProductAddedToCart) {
      dispatch(setCartList(cartList.filter(car => car.id !== product.id)));
    } else {
      dispatch(setCartList([...cartList, productWithQuantity]));
    }
  }

  return (
    <div
      className={`${cl.buttonContainer} ${className}`}
      style={{ height: height }}
    >
      <button
        className={`${cl.buttonContainer__cardButton} ${isProductAddedToCart && cl.buttonContainer__cardButtonAdded}`}
        style={{ lineHeight: height }}
        onClick={handleAddAndRemoveFromCart}
      >
        {isProductAddedToCart
          ? textContent.added[language]
          : textContent.add[language]}
      </button>
      <button
        className={cl.buttonContainer__favButton}
        style={{ minWidth: height }}
        onClick={handleAddAndRemoveFromFavList}
      >
        <svg
          className={`${cl.buttonContainer__favButtonIcon} ${isProductAddedToFav && cl.buttonContainer__favButtonIconAdded}`}
        />
      </button>
    </div>
  );
};
