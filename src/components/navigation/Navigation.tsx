import { NavLinkCustom } from '../navLink/NavLinkCustom';
import './navigastion.scss';

type Props = {
  favorite: number;
  shoping: number;
};

export const Navigation: React.FC<Props> = ({ favorite, shoping }) => {
  return (
    <nav className="navigation">
      <div className="wrapper">
        <NavLinkCustom text="home" way="/" classStyle="nav-link" />
        <NavLinkCustom text="phones" way="/phones" classStyle="nav-link" />
        <NavLinkCustom text="tablets" way="/tablets" classStyle="nav-link" />
        <NavLinkCustom
          text="accessories"
          way="/accessories"
          classStyle="nav-link"
        />
      </div>
      <div className="wrapper-link-icon">
        <input
          type="text"
          className="search"
          placeholder="Search in phones..."
        />
        <NavLinkCustom
          way="/favourites"
          classStyle="nav-link link-favorite"
        >
          <div className="count">{favorite}</div>
        </NavLinkCustom>
        <NavLinkCustom
          way="/shopping"
          classStyle="nav-link link-shopping "
        >
          <div className="count">{shoping}</div>
        </NavLinkCustom>
      </div>
    </nav>
  );
};
