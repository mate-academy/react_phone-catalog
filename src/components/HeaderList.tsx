import { PageLink } from './PageLink';

export const HeaderList = () => (
  <ul className="header__list">
    <li className="header__item">
      <PageLink to="/" text="Home" />
    </li>
    <li className="header__item">
      <PageLink to="/phones" text="Phones" />
    </li>
    <li className="header__item">
      <PageLink to="/tablets" text="Tablets" />
    </li>
    <li className="header__item">
      <PageLink to="/accessories" text="Accessories" />
    </li>
  </ul>
);
