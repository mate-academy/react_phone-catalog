import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import './Navigation.scss';
import { useContext } from 'react';
import { MenuContext } from '../../../../store/MenuContext';

type Props = {
  className?: string;
};

export const Navigation: React.FC<Props> = ({ className = '' }) => {
  const { displayMenu, setDisplayMenu } = useContext(MenuContext);
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(`text--small nav__link`, {
      'navlink--underline': isActive,
      'link--underline text--grey': !isActive,
    });
  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (displayMenu) {
      setDisplayMenu(false);
    }
  };

  const pages = ['HOME', 'PHONES', 'TABLETS', 'ACCESSORIES'];

  return (
    <>
      <nav className={`${className} nav`}>
        <ul className={`${className}__list nav__list`}>
          {pages.map(pageLink => {
            const link = `/${pageLink === 'HOME' ? '' : pageLink.toLowerCase()}`;
            const linkTitle = pageLink.toUpperCase();

            return (
              <li className={`nav__item `} key={pageLink}>
                <NavLink
                  to={link}
                  className={getLinkClass}
                  onClick={handleLinkClick}
                >
                  {linkTitle}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};
