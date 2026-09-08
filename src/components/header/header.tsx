import { useContext } from 'react';
import { Menu } from '../../components/menu';
import { TopBar } from '../../components/top-bar';
import { useMediaQuery } from 'react-responsive';
import styles from './header.module.scss';
import { ProductContext } from '../../context/ProductContext';

export const Header = () => {
  const isMobile = useMediaQuery({ maxWidth: 639 });
  const { openMenu } = useContext(ProductContext);

  return (
    <header className={styles.header}>
      <TopBar isMobile={isMobile} />
      {isMobile && openMenu && <Menu />}
    </header>
  );
};
