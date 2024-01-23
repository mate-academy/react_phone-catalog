import classNames from 'classnames';
import React from 'react';

type Props = {
  addToBag: () => void,
  boolVal: boolean,
  favBool: boolean,
  addAndRemove: () => void,
};

export const Buttons: React.FC<Props> = ({
  addToBag,
  boolVal,
  favBool,
  addAndRemove,
}) => {
  return (
    <div className="buttons">
      <button
        className={classNames(
          { buttons_addToBag: !boolVal },
          { 'buttons_addToBag-active': boolVal },
        )}
        type="button"
        disabled={boolVal}
        onClick={addToBag}
      >
        {boolVal ? 'Added to cart' : 'Add to cart'}
      </button>
      <button
        className={classNames('buttons_addToFavorite', {
          'buttons_addToFavorite-active': favBool,
        })}
        type="button"
        aria-label="button"
        onClick={addAndRemove}
      />
    </div>
  );
};
