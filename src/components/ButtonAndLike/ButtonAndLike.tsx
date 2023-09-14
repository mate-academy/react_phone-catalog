import classNames from 'classnames';
import { useMemo } from 'react';
import { ButtonsSize } from '../../enum/ButtonsSize';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleLike } from '../../store/features/favorites';
import { add as addToCart } from '../../store/features/cart';
import './ButtonAndLike.scss';

type Props = {
  size: ButtonsSize,
  phoneId: string,
};

export const ButtonAndLike: React.FC<Props> = ({ size, phoneId }) => {
  const dispatch = useAppDispatch();
  const { favStorage } = useAppSelector(state => state.favorite);

  const existingLikes = useMemo(() => {
    return favStorage.map(like => like && like.itemId);
  }, [favStorage]);

  switch (size) {
    case ButtonsSize.smallOn:
      return (
        <div className="btns-container">
          <button
            type="button"
            className="btn btn--small"
            onClick={() => dispatch(addToCart(phoneId))}
          >
            {ButtonsSize.smallOn}
          </button>

          <button
            type="button"
            aria-label="favorite"
            onClick={() => dispatch(toggleLike(phoneId))}
            className={classNames(
              'fav fav--small',
              { 'fav--is-active': existingLikes.includes(phoneId) },
            )}

          />
        </div>
      );

    case ButtonsSize.bigOn:
      return (
        <div className="btns-container">
          <button
            type="button"
            className="btn btn--big"
            onClick={() => dispatch(addToCart(phoneId))}
          >
            {ButtonsSize.bigOn}
          </button>

          <button
            type="button"
            aria-label="favorite"
            onClick={() => dispatch(toggleLike(phoneId))}
            className={classNames(
              'fav fav--big',
              { 'fav--is-active': existingLikes.includes(phoneId) },
            )}
          />
        </div>
      );

    case ButtonsSize.smallOff:
      return (
        <div className="btns-container">
          <button
            type="button"
            className="btn btn--small btn--disabled"
            disabled
          >
            {ButtonsSize.smallOff}
          </button>

          <button
            type="button"
            aria-label="favorite"
            onClick={() => dispatch(toggleLike(phoneId))}
            className={classNames(
              'fav fav--small',
              { 'fav--is-active': existingLikes.includes(phoneId) },
            )}

          />
        </div>
      );

    case ButtonsSize.bigOff:
      return (
        <div className="btns-container">
          <button
            type="button"
            className="btn btn--big btn--disabled"
            disabled
          >
            {ButtonsSize.bigOff}
          </button>

          <button
            type="button"
            aria-label="favorite"
            onClick={() => dispatch(toggleLike(phoneId))}
            className={classNames(
              'fav fav--big',
              { 'fav--is-active': existingLikes.includes(phoneId) },
            )}

          />
        </div>
      );

    default:
      return null;
  }
};
