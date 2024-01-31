import { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import { FavouritesIcon } from '../../icons/FavouritesIcon';
import { FavouritesIconRed } from '../../icons/FavouritesIconRed';
import './Buttons.scss';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  addPhoneToCart,
  removePhoneFromCart,
  selectCartPhones,
} from '../../features/cartSlices/cartSlice';
import {
  addToFavourites,
  selectFavouritesPhones,
} from '../../features/favouritesSlices/favouritesSlice';
import { IPhone } from '../../types/Phone.interface';

type Props = {
  widthSelectedButton: number;
  heightSelectedButton: number;
  widthAddButton: number;
  heightAddButton: number;
  phoneID: string;
  phone: IPhone | undefined;
};

export const Buttons: FC<Props> = ({
  phoneID,
  phone,
  widthAddButton,
  heightAddButton,
  widthSelectedButton,
  heightSelectedButton,
}) => {
  const cartPhones = useAppSelector(selectCartPhones);
  const favouritesPhones = useAppSelector(selectFavouritesPhones);

  const [hasPhoneInCart, setHasPhoneInCart] = useState(false);
  const [hasPhoneInFavourites, setHasPhoneInFavourites] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const isPhoneInFavourites = favouritesPhones.some(
      (item) => item.phoneId === phoneID,
    );

    const isPhoneInCart = cartPhones.some(
      (item) => item.phoneId === phoneID,
    );

    setHasPhoneInCart(isPhoneInCart);
    setHasPhoneInFavourites(isPhoneInFavourites);
  }, [phoneID]);

  const handleRemovePhoneFromCart = () => {
    setHasPhoneInCart(false);
    dispatch(removePhoneFromCart(phoneID));
  };

  const handleAddPhoneToCart = () => {
    if (phone) {
      const newPhone: IPhone = {
        ...phone,
        quantity: 1,
      };

      setHasPhoneInCart(true);
      dispatch(addPhoneToCart(newPhone));
    }
  };

  const handleAddToMyFavourites = () => {
    setHasPhoneInFavourites(prev => !prev);
    if (phone) {
      dispatch(addToFavourites(phone));
    }
  };

  return (
    <div className="buttons">
      {hasPhoneInCart ? (
        <button
          type="button"
          style={{ width: widthAddButton, height: heightAddButton }}
          className="buttons__added"
          onClick={handleRemovePhoneFromCart}
        >
          Added to cart
        </button>
      ) : (
        <button
          type="button"
          style={{ width: widthAddButton, height: heightAddButton }}
          className="buttons__add"
          onClick={handleAddPhoneToCart}
        >
          Add to cart
        </button>
      )}
      <button
        type="button"
        style={{ width: widthSelectedButton, height: heightSelectedButton }}
        className={cn('buttons__favorites', {
          selected: hasPhoneInFavourites,
        })}
        onClick={handleAddToMyFavourites}
      >
        {
          hasPhoneInFavourites
            ? <FavouritesIconRed />
            : <FavouritesIcon />
        }
      </button>
    </div>
  );
};
