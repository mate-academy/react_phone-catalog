import classNames from 'classnames';
import { useMemo } from 'react';
import { ButtonsSize } from '../../enum/ButtonsSize';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleLike } from '../../store/features/favorites';
import { add as addToCart } from '../../store/features/cart';
import './ButtonAndLike.scss';
import { Phone } from '../../types/Phone';

type Props = {
  size: ButtonsSize,
  phone: Phone | null,
};

export const ButtonAndLike: React.FC<Props> = ({ size, phone }) => {
  const dispatch = useAppDispatch();
  const { addedToFav } = useAppSelector(state => state.favorite);

  const buttonsStyles = useMemo(() => {
    switch (size) {
      case ButtonsSize.smallOn:
        return {
          button: 'btn btn--small',
          fav: 'fav fav--small',
          title: 'Add to cart',
        };
      case ButtonsSize.bigOn:
        return {
          button: 'btn btn--big',
          fav: 'fav fav--big',
          title: 'Add to cart',
        };
      case ButtonsSize.smallOff:
        return {
          button: 'btn btn--small btn--disabled',
          fav: 'fav fav--small',
          title: 'Added to cart',
        };
      case ButtonsSize.bigOff:
        return {
          button: 'btn btn--big btn--disabled',
          fav: 'fav fav--big',
          title: 'Added to cart',
        };

      default:
        return null;
    }
  }, [size, phone]);

  return (
    <div className="btns-container">
      <button
        type="button"
        className={buttonsStyles?.button}
        onClick={() => phone && dispatch(addToCart(phone))}
      >
        {buttonsStyles?.title}
      </button>

      <button
        type="button"
        aria-label="favorite"
        onClick={() => phone && dispatch(toggleLike(phone))}
        className={classNames(
          buttonsStyles?.fav,
          { 'fav--is-active': addedToFav.includes(phone?.itemId || '') },
        )}
      />
    </div>
  );
};
