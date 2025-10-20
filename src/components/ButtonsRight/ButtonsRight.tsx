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

  const buttonsNav = [
    { to: '/favourites', img: '/img/favourites.svg', alt: 'Favourites' },
    { to: '/cart', img: '/img/cart.png', alt: 'Cart' },
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
          <img src={link.img} alt={link.alt} />
        </NavLink>
      ))}
    </div>
  );
};
