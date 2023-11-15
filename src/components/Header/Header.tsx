import { PageLinkType } from '../../types/PageLinkType';
import { Logo } from '../Logo';
import { Nav } from '../Nav';
import { PageLink } from '../PageLink';

import './Header.scss';

export const Header = () => (
  <header className="Page-Header Header">
    <div className="Header-Left">
      <Logo />

      <Nav />
    </div>

    <div className="Header-Right">
      <PageLink to="/favourites" linkType={PageLinkType.HEART} />
      <PageLink to="/cart" linkType={PageLinkType.CART} />
    </div>
  </header>
);
