import Logo from '../Logo/Logo';
import Navbar from '../Navbar/Navbar';
import style from './Header.module.scss';

export const Header = () => {
  return (
    <>
      <header className={style.header}>
        <div className={style.header__content}>
          <div className={style.header__logo}>
            <Logo />
          </div>
          <Navbar />
        </div>
      </header>
    </>
  );
};
