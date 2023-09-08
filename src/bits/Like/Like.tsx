/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import './Like.scss';
import { useProducts } from '../../context';

type Props = {
  handler?: () => void,
  disabled?: boolean,
  id: string,
  size?: 'large',
};

export const Like: React.FC<Props> = ({
  handler,
  disabled,
  id,
  size,
}) => {
  const { favourites } = useProducts();

  const isActiveFav = favourites.some(fav => fav.itemId === id);

  return (
    <button
      data-cy="addToFavorite"
      type="button"
      className={classNames('like', {
        'like--selected': isActiveFav,
        'like--large': size === 'large',
      })}
      disabled={disabled}
      onClick={handler}
    />
  );
};
