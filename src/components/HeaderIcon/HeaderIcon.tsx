import { Link, useLocation } from 'react-router-dom';
import styles from './HeaderIcon.module.scss';
import { useContext } from 'react';
import { FavContext } from '../../modules/shared/context/FavContext';
import { CartContext } from '../../modules/shared/context/CartContext';

type Props = {
  iconName: string;
  width?: number | string;
  height?: number | string;
  onClickIcon?: () => void;
  borderHeight?: number;
};

export const HeaderIcon: React.FC<Props> = ({
  iconName,
  width,
  height,
  onClickIcon,
  borderHeight = 3,
}) => {
  const { pathname } = useLocation();
  const { favouritesProducts } = useContext(FavContext);
  const { cartProducts } = useContext(CartContext);

  const isActionIcon = iconName === 'menu' || iconName === 'close';

  const handleClick = () => {
    if (onClickIcon) {
      onClickIcon();
    }
  };

  const linkTo = isActionIcon ? pathname : `/${iconName}`;

  return (
    <Link
      to={linkTo}
      onClick={handleClick}
      className={styles.icon}
      style={{
        width: width,
        height: height,
        borderBottom: pathname.includes(iconName)
          ? `${borderHeight}px solid #313237`
          : '',
      }}
    >
      <div
        className={`${styles['icon-content']} ${styles[`icon--${iconName}`]}`}
      >
        {((iconName === 'favourites' && favouritesProducts.length > 0) ||
          (iconName === 'cart' && cartProducts.length > 0)) && (
          <div className={styles.icon__counter}>
            {iconName === 'favourites'
              ? favouritesProducts?.length
              : cartProducts?.length}
          </div>
        )}
      </div>
    </Link>
  );
};
