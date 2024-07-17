import { Slider } from '../Slider';
import { TopBar } from '../TopBar';
import style from './Header.module.scss';

export const Header = () => (
  <header className={style.header}>
    <TopBar />
    <h1 className={style.header__title}>Welcome to Nice Gadgets store!</h1>
    <Slider />
  </header>
);
