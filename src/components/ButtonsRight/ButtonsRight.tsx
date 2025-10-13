import styles from './ButtonsRight.module.scss';
import { NavLink, useParams } from 'react-router-dom';

export const ButtonsRight = () => {
  const { category } = useParams();

  const buttonsNav = [
    { to: '/favourites', img: '/img/favourites.svg', alt: 'Favourites' },
    { to: '/cart', img: '/img/cart.png', alt: 'Cart' },
  ];

  return (
    <div className={styles.buttonsRight}>
      {buttonsNav.map(link => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            category === link.to || isActive ? styles.active : ''
          }
        >
          <img src={link.img} alt={link.alt} />
        </NavLink>
      ))}
    </div>
  );
};
