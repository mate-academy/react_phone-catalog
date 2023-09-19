/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import './Like.scss';

export enum LikeSize {
  Large = 'large',
}

type Props = {
  onClickHandler?: () => void,
  liked: boolean,
  disabled?: boolean,
  size?: LikeSize,
};

export const Like: React.FC<Props> = ({
  onClickHandler,
  disabled,
  liked,
  size,
}) => (
  <button
    data-cy="addToFavorite"
    type="button"
    className={classNames('like', {
      'like--selected': liked,
      'like--large': size === LikeSize.Large,
    })}
    disabled={disabled}
    onClick={onClickHandler}
  />
);
