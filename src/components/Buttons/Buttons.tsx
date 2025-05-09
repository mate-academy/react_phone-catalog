import { useDispatch, useSelector } from 'react-redux';
import { toggleFavourite } from '@/store/features/products/favouritesSlice';
import { RootState } from '@/store';
import { Product } from '@/types/Product';
import { toggleCart } from '@/store/features/products/cartSlice';

type ButtonProps = {
  product: Product;
  cartButtonClassName?: string;
  favButtonClassName?: string;
};

export const Buttons = ({
  product,
  cartButtonClassName = '',
  favButtonClassName = '',
}: ButtonProps) => {
  const dispatch = useDispatch();
  const favourites = useSelector((state: RootState) => state.favourites.items);
  const cart = useSelector((state: RootState) => state.cart.items);

  if (!product || !product.id) return null;

  const isFavourites = favourites.some(item => item.id === product.id);
  const isCart = cart.some(item => item.id === product.id);

  const handleToggleFavourites = () => {
    dispatch(toggleFavourite(product));
  };

  const handleToggleCart = () => {
    dispatch(toggleCart(product));
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleToggleCart}
        className={`flex-1 text-text-color-base-white 
                py-[9.5px] px-[39.5px] text-sm leading-[21px] font-bold ${isCart ? 'bg-background-color-btn' : 'bg-color-btn-purple hover:bg-color-btn-purple-hover'}
                ${cartButtonClassName}
        `}
      >
        {isCart ? 'Added' : 'Add to cart'}
      </button>
      <button
        onClick={handleToggleFavourites}
        className={`w-10 h-10 flex items-center justify-center ${isFavourites ? 'border border-color-border bg-transparent' : 'bg-background-color-btn hover:bg-background-color-btn-hover'}
                ${favButtonClassName}
             `}
      >
        <img
          src={
            isFavourites ? 'icons/favourites-liked.svg' : 'icons/favourites.svg'
          }
          alt="like"
        />
      </button>
    </div>
  );
};
