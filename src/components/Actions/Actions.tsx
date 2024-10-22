import cn from 'classnames';
import styles from './Actions.module.scss';
import { useState } from 'react';
import { SvgIcon } from '../SvgIcon';

interface Props {
  productId: string;
  className?: string;
}

export const Actions: React.FC<Props> = ({ className }) => {
  const [isFavourite, setIsFavourite] = useState(false);

  const changeFavouriteStatus = () => {
    setIsFavourite(value => !value);
  };

  return (
    <div className={cn(styles.actions, className)}>
      <button className={cn(styles['actions__btn-cart'])}>Add to cart</button>

      <button
        className={cn(styles['actions__btn-favourites'], {
          [styles['actions__btn-favourites--active']]: isFavourite,
        })}
        onClick={changeFavouriteStatus}
        aria-label="Change favourite status"
      >
        {isFavourite ? (
          <SvgIcon type={'heart-like'} />
        ) : (
          <SvgIcon type={'heart'} />
        )}
      </button>
    </div>
  );
};
