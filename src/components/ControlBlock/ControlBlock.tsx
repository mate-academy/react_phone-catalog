import classNames from 'classnames';
import React, { useState } from 'react';
import './ControlBlock.scss';

type Props = {
  isLarge: boolean;
};

export const ControlBlock: React.FC<Props> = ({
  isLarge,
}) => {
  const [isAddedToFovourite, setIsAddedToFovourite] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  return (
    <div className="control-block">
      <button
        type="button"
        className={classNames(
          'button',
          'control-block__button',
          {
            'button--is-active': isAddedToCart,
            'button--is-large': isLarge,
          },
        )}
        onClick={() => {
          setIsAddedToCart(curr => !curr);
        }}
      >
        Add to cart
      </button>
      <button
        type="button"
        className="
          control-block__button
          control-block__button--is-transparent"
        onClick={() => {
          setIsAddedToFovourite(curr => !curr);
        }}
      >
        <div className={classNames(
          'icon-box',
          'icon-box--is-big',
          { 'icon-box--is-large': isLarge },
        )}
        >
          <span className={classNames(
            'icon',
            'icon--heart',
            { 'icon--heart-selected': isAddedToFovourite },
          )}
          />
        </div>
      </button>
    </div>
  );
};
