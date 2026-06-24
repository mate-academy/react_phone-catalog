import classNames from 'classnames';
import { imageUrl } from '../../../utils/imageUrl';
import styles from './ButtonLiked.module.scss';
import { useTheme } from '../../../hooks/useTheme';

type Props = {
  type?: 'button' | 'submit' | 'reset';
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  isActive?: boolean;
};

export const ButtonLiked = (props: Props) => {
  const { type = 'button', isActive = false, onClick } = props;
  const { theme } = useTheme();

  return (
    <button
      onClick={onClick}
      type={type}
      className={classNames(styles.button, {
        [styles.button__active]: isActive,
      })}
    >
      <img
        className={styles.icon}
        src={
          theme === 'dark'
            ? imageUrl('icons/Favourites_white.svg')
            : imageUrl('icons/Favourites.svg')
        }
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
