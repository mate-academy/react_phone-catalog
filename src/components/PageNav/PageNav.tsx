import classNames from 'classnames';
import { PageNavLink } from '../PageNavLink';
import pageNavList from '../../api/headerNav.json';
import { PageNavLinkType } from '../../types/PageNavLink';
import './PageNav.scss';

type Props = {
  type: PageNavLinkType;
};

export const PageNav: React.FC<Props> = ({ type }) => {
  const navType = (type === 'menu')
    ? 'menu'
    : 'header';

  return (
    <div
      className={classNames(
        { nav: navType === 'header' },
        { menu__list: navType === 'menu' },
      )}
    >
      {pageNavList.map(navItem => (
        <PageNavLink
          key={navItem.title}
          to={navItem.link}
          text={navItem.title}
          type={navType}
        />
      ))}
    </div>
  );
};
