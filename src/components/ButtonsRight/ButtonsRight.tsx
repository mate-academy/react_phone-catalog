import { useCart } from '../../ProductsContext/CartContext';
import { useFavourite } from '../../ProductsContext/FavouriteContext';
import styles from './ButtonsRight.module.scss';
import { NavLink, useParams } from 'react-router-dom';

interface ButtonsRightProps {
  isBurgerMenu?: boolean;
  onClose?: () => void;
}

export const ButtonsRight: React.FC<ButtonsRightProps> = ({
  isBurgerMenu,
  onClose,
}) => {
  const { category } = useParams();
  const { favourites } = useFavourite();
  const { cartItems } = useCart();

  const buttonsNav = [
    {
      to: '/favourites',
      img: './img/image/Icons/Hart.svg',
      alt: 'Favourites',
      count: favourites.length,
    },
    {
      to: '/cart',
      img: '/img/image/Icons/Cart.svg',
      alt: 'Cart',
      count: cartItems.length,
    },
  ];

  return (
    <div
      className={`${styles.buttonsRight} ${isBurgerMenu ? styles.burgerMenuBox : ''}`}
    >
      {buttonsNav.map((link, i) => (
        <NavLink
          key={link.to}
          to={link.to}
          onClick={onClose}
          style={{ borderRight: i === 0 ? '1px solid #323542' : '' }}
          className={({ isActive }) =>
            `
              ${isActive || category === link.to ? styles.active : ''}
              ${isBurgerMenu ? styles.burgerMenu : styles.homePage}
            `
          }
        >
          <div className={styles.container}>
            {link.count > 0 && <div className={styles.count}>{link.count}</div>}
            <img src={link.img} alt={link.alt} />
          </div>
        </NavLink>
      ))}
    </div>
  );
};
