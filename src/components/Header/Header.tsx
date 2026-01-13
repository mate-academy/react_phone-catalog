import s from './Header.module.scss';
import Favourites from '/img/icons/favourites_(Heart Like).svg';
import Cart from '/img/icons/cart.svg';
import { Navbar } from '../Navbar';

export const Header = () => (
  <header className={`Header is-fixed-top  ${s.header_line}`}>
    <div
      className={`${s.header_style} is-flex is-justify-content-space-between is-align-items-center`}
    >
      <Navbar />
      <div className="buttons has-addons">
        <button className={`button ${s.btn_style}`}>
          <img src={Favourites} alt="Favourites" width={16} height={16} />
        </button>

        <button className={`button ${s.btn_style}`}>
          <img src={Cart} alt="Cart" width={15} height={16} />
        </button>
      </div>
    </div>
  </header>
);
