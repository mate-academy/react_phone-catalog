import { AriaNames } from '@shared/types/ButtonProps';
import styles from '../styles/buttons.module.scss';
import { HeartIcon } from '@shared/icons';

type Props = {
  isInFav: boolean;
  isInCart: boolean;
  handleCart: (e: React.MouseEvent) => void;
  handleFav: (e: React.MouseEvent) => void;
};

export const CardButtons = ({ ...data }: Props) => {
  const { isInFav, handleCart, handleFav } = data;

  const cartParams = data.isInCart
    ? { className: styles['cart-button__active'], text: 'Added' }
    : { className: styles['cart-button'], text: AriaNames.AddCart };

  const favLabel = isInFav ? AriaNames.RmFav : AriaNames.AddFav;

  return (
    <div className={styles.container}>
      <button className={cartParams.className} onClick={e => handleCart(e)}>
        {cartParams.text}
      </button>
      <button
        className={styles['fav-button']}
        aria-label={favLabel}
        onClick={e => handleFav(e)}
      >
        <HeartIcon filled={isInFav} />
      </button>
    </div>
  );
};
