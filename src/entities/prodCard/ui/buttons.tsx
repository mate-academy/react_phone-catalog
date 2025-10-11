/* eslint-disable @typescript-eslint/indent */
import { AriaNames } from '@shared/types/ButtonProps';
import styles from '../styles/buttons.module.scss';
import { HeartIcon } from '@shared/icons';
import { Item } from '@features/globalStore/types';

type Props = {
  item: Item;
  isInFav: boolean;
  isInCart: boolean;
  handleCart: (e: React.MouseEvent, item: Item) => void;
  handleFav: (e: React.MouseEvent, item: Item) => void;
};

export const CardButtons: React.FC<Props> = ({
  item,
  isInFav,
  isInCart,
  handleCart,
  handleFav,
}) => {
  const cartParams = isInCart
    ? {
        style: styles['cart-button__active'],
        aria: AriaNames.RmCart,
        text: 'Added',
      }
    : {
        style: styles['cart-button'],
        aria: AriaNames.AddCart,
        text: AriaNames.AddCart,
      };

  const favNames = isInFav ? AriaNames.RmFav : AriaNames.AddFav;

  return (
    <div className={styles.container}>
      <button
        className={cartParams.style}
        aria-label={cartParams.aria}
        onClick={e => handleCart(e, item)}
      >
        {cartParams.text}
      </button>
      <button
        className={styles['fav-button']}
        aria-label={favNames}
        onClick={e => handleFav(e, item)}
      >
        <HeartIcon filled={isInFav} />
      </button>
    </div>
  );
};
