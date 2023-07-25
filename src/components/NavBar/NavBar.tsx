import classNames from 'classnames';
import { PageNavLink } from '../PageNavLink/PageNavLink';
import { PageNavLinkType } from '../../types/PageNavLink';
import headerList from '../../api/headerNav.json';
import './NavBar.scss';

type Props = {
  type: PageNavLinkType,
};

export const NavBar: React.FC<Props> = ({ type }) => {
  const pageNavType = (type === 'menu')
    ? 'menu'
    : 'header';

  return (
    <div
      className={classNames(
        {
          navbar: pageNavType === 'header',
          menu__list: pageNavType === 'menu',
        },
      )}
    >
      {headerList.map(navItem => (
        <PageNavLink
          key={navItem.title}
          to={navItem.link}
          text={navItem.title}
          type={pageNavType}
        />
      ))}
    </div>
  );
};
