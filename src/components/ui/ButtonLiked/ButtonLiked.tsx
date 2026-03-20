import classNames from 'classnames';
import { imageUrl } from '../../../utils/imageUrl';
import styles from './ButtonLiked.module.scss';

type Props = {
  type?: 'button' | 'submit' | 'reset';
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  isActive?: boolean;
};

export const ButtonLiked = (props: Props) => {
  const { type = 'button', isActive = false } = props;

  return (
    <button
      type={type}
      className={classNames(styles.button, {
        [styles.button__active]: isActive,
      })}
    >
      <img
        className={styles.icon}
        src={imageUrl('icons/Favourites.svg')}
        alt="favourites-icon"
      />
      <img
        className={classNames([styles.icon, styles.icon__filled])}
        src={imageUrl('icons/Favourites_filled.svg')}
        alt="favourites-icon-filled"
      />
    </button>
  );
};
