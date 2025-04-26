import { Logo } from 'components/Logo';
import styles from './FullScreenMenu.module.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { IconButton } from 'components/IconButton';
import { FiHeart, FiShoppingBag, FiX } from 'react-icons/fi';
import { BadgeButton } from 'components/BadgeButton';
import { useContext } from 'react';
import { ProductsContext } from 'store/ProductsContext';
import useCheckUrl from 'hooks/useCheckUrl';

export const FullScreenMenu = () => {
  const navigate = useNavigate();
  const { isCartPage, isFavouritesPage } = useCheckUrl();

  const { setToggleMenu } = useContext(ProductsContext);

  const links = [
    { label: 'HOME', path: '/' },
    { label: 'PHONES', path: '/phones' },
    { label: 'TABLETS', path: '/tablets' },
    { label: 'ACCESSORIES', path: '/accessories' },
  ];

  const handleToggleMenu = () => {
    setToggleMenu(prev => !prev);
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__content}>
        <div className={styles.container__content__header}>
          <Logo />
          <IconButton
            icon={<FiX size={24} color={'#B4BDC3'} />}
            width={'48px'}
            height={'48px'}
            useBorder
            onClick={handleToggleMenu}
          />
        </div>
        <nav className={styles.container__content__menu}>
          {links.map(item => (
            <NavLink
              key={item.label}
              className={({ isActive }) =>
                `${styles.container__content__menu__link__item} ${
                  isActive ? styles.active : ''
                }`
              }
              to={item.path}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className={styles.container__content__footer}>
          <BadgeButton
            icon={<FiHeart size={24} color={'#313237'} />}
            isSelected={isFavouritesPage}
            width={'100%'}
            onClick={() => navigate('/favourites')}
          />
          <BadgeButton
            icon={<FiShoppingBag size={24} color={'#313237'} />}
            isSelected={isCartPage}
            width={'100%'}
            onClick={() => navigate('/cart')}
          />
        </div>
      </div>
    </div>
  );
};
