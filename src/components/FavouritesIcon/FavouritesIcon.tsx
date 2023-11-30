/* eslint-disable react/button-has-type */
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addFavourites, removeFavourites,
} from '../../features/favouritesSlice';
import { ProductPhone } from '../../Type/phone';
import './FavouritesIcon.scss';

type Props = {
  phone: ProductPhone | null;
};

export const FavouritesIcon: React.FC<Props> = ({ phone }) => {
  const favouritesPhones
    = useAppSelector(state => state.favourites.favouritesPhones);
  const dispatch = useAppDispatch();

  function handelAddPhone() {
    if (phone && !favouritesPhones.includes(phone)) {
      dispatch(addFavourites(phone));
    }

    if (phone && favouritesPhones.includes(phone)) {
      dispatch(removeFavourites(phone));
    }
  }

  return (
    <button
      aria-label="Mute volume"
      className={classNames(
        'icon__favourites', {
          'icon__favourites-active': phone && favouritesPhones.includes(phone),
        },
      )}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handelAddPhone();
      }}
    />
  );
};
