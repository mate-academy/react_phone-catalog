import { TopBar } from '../TopBar/TopBar';
import style from './Header.module.scss';

export const Header = () => {
  return (
    <header className={style.header}>
      <TopBar />
    </header>
  );
};
