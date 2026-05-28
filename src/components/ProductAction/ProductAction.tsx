import classNames from 'classnames';
import styles from './ProductAction.module.scss';

type Props = {
  variant?: 'smallButtonSize' | 'bigButtonSize';
};

export const ProductAction: React.FC<Props> = ({
  variant = 'smallButtonSize',
}) => (
  <>
    <button
      className={classNames(styles.buttonAdd, styles.buttons, {
        [styles.addBig]: variant === 'bigButtonSize',
      })}
    >
      Add to cart
    </button>

    <button
      className={classNames(
        styles.buttons,
        // styles[variant],
        styles.buttonFavorite,
        {
          [styles.favoriteBig]: variant === 'bigButtonSize',
        },
      )}
      aria-label="Add to favourites"
    >
      <img
        src="/img/icons/heart-Icon.svg"
        alt="heart-logo"
        className={styles.buttonFavorite__icon}
      />
    </button>
  </>
);

export default ProductAction;
