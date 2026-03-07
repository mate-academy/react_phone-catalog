import classNames from 'classnames';
import styles from './ButtonLiked.module.scss';

type Props = {
  type?: 'button' | 'submit' | 'reset';
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
        src={
          isActive ? '/icons/Favourites_filled.svg' : '/icons/Favourites.svg'
        }
        alt=""
        className={styles.button__icon}
      />
    </button>
  );
};
