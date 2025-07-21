/* eslint-disable @typescript-eslint/indent */
import { AriaNames } from '@shared/types/ButtonProps';
import styles from '../styles/buttons.module.scss';
import { HeartIcon } from '@shared/icons';

type Props = {
  isInFav: boolean;
  isInCart: boolean;
  handleCart: (e: React.MouseEvent) => void;
  handleFav: (e: React.MouseEvent) => void;
};

export const CardButtons: React.FC<Props> = ({
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
        onClick={handleCart}
      >
        {cartParams.text}
      </button>
      <button
        className={styles['fav-button']}
        aria-label={favNames}
        onClick={handleFav}
      >
        <HeartIcon filled={isInFav} />
      </button>
    </div>
  );
};
