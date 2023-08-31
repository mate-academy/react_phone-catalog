import classNames from 'classnames';
import { useContext } from 'react';
import { StoragesContext } from '../../Context/StoragesContext';
import './ButtonAndLike.scss';
import { ButtonsSize } from '../../enum/ButtonsSize';

type Props = {
  size: ButtonsSize,
  phoneId: string,
  handleAdd?: (v: string) => void,
  handleLike: (v: string) => void,
};

export const ButtonAndLike: React.FC<Props> = ({
  size,
  handleLike,
  handleAdd,
  phoneId,
}) => {
  const { existingLikes } = useContext(StoragesContext);

  switch (size) {
    case ButtonsSize.smallOn:
      return (
        <div className="btns-container">
          <button
            type="button"
            className="btn btn--small"
            onClick={() => handleAdd && handleAdd(phoneId)}
          >
            {ButtonsSize.smallOn}
          </button>

          <button
            type="button"
            aria-label="favorite"
            onClick={() => handleLike(phoneId)}
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
            onClick={() => handleAdd && handleAdd(phoneId)}
          >
            {ButtonsSize.bigOn}
          </button>

          <button
            type="button"
            aria-label="favorite"
            onClick={() => handleLike(phoneId)}
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
            onClick={() => handleLike(phoneId)}
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
            onClick={() => handleLike(phoneId)}
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
