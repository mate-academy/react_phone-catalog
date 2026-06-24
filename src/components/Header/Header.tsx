import { Navbar } from '../Navbar';
import s from './Header.module.scss';

export const Header = () => {
  return (
    <header className={`Header is-fixed-top  ${s.header_line}`}>
      <div className={`${s.header_style} `}>
        <Navbar />
      </div>
    </header>
  );
};
