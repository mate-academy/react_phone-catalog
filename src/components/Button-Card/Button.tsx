import { useState } from 'react';
import style from './button.module.scss';
import favourit from '@Images/icons/like-icons.svg';
import cn from 'classnames';

type Props = {
  increaseToCart: () => void;
  notifyAdded: () => void;
  isAdded?: boolean;
};

export const Button: React.FC<Props> = ({
  increaseToCart,
  notifyAdded,
  isAdded,
}) => {
  const [isAddItem, setIsAddItem] = useState(false);

  const toggle = () => {
    setIsAddItem(!isAddItem);
  };

  return (
    <>
      <div className={`${style.container} `}>
        <button
          onClick={() => {
            toggle();
            notifyAdded();
            increaseToCart();
          }}
          className={cn(style.button, {
            [style.button__added]: isAdded,
            [style.button__empty]: !isAdded,
          })}
          disabled={isAddItem}
        >
          <span className={style.button__text}>
            {isAddItem ? 'Added' : 'Add to cart'}
          </span>
        </button>
        <div className={style.favourit}>
          <img className={style.favourit__icon} src={favourit} alt="" />
        </div>
      </div>
    </>
  );
};
