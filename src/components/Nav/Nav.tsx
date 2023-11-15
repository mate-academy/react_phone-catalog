import { PageLinkType } from '../../types/PageLinkType';
import { PageLink } from '../PageLink';
import './Nav.scss';

export const Nav = () => (
  <nav className="Nav">
    <ul className="Nav-List">
      <li className="Nav-Item">
        <PageLink
          to="/"
          linkType={PageLinkType.TEXT}
        >
          home
        </PageLink>
      </li>

      <li className="Nav-Item">
        <PageLink
          to="/phones"
          linkType={PageLinkType.TEXT}
        >
          phones
        </PageLink>
      </li>

      <li className="Nav-Item">
        <PageLink
          to="/tablets"
          linkType={PageLinkType.TEXT}
        >
          tablets
        </PageLink>
      </li>

      <li className="Nav-Item">
        <PageLink
          to="/accessories"
          linkType={PageLinkType.TEXT}
        >
          accessories
        </PageLink>
      </li>
    </ul>
  </nav>
);
