/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';
import './ButtonEvent.scss';

type DynamicClass = 'no-border' | 'shadow' | 'big' | 'large';

type Shape = 'close' | 'minus' | 'plus' | 'up' | 'menu' | 'left' | 'right' | 'loop';

type Props = {
  dynamicClasses?: DynamicClass[];
  shape: Shape;
  disable?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const ButtonEvent: React.FC<Props> = ({
  dynamicClasses,
  shape,
  disable,
  onClick,
}) => {
  const DC = dynamicClasses?.map(cl => `buttonEvent--${cl}`).join(' ');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type="button"
      aria-label="button"
      onClick={(e) => handleClick(e)}
      disabled={disable}
      className={classNames(
        'buttonEvent', DC, {
          'buttonEvent--disactive': disable,
        },
      )}
    >
      <div className={classNames('buttonEvent__icon-keeper')}>
        <div className={classNames(
          'buttonEvent__icon',
          `buttonEvent__icon--${shape}`, {
            'buttonEvent__icon--disactive': disable,
          },
        )}
        />
      </div>
    </button>
  );
};
