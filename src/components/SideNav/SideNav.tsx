import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Container } from '../Container/Container';
import { Logo } from '../Logo/Logo';
import './SideNav.scss';

type Props = {
  isSideNavShown: boolean,
  setIsSideNavShown: (v: boolean) => void,
};

export const SideNav: React.FC<Props> = ({
  isSideNavShown,
  setIsSideNavShown,
}) => {
  return (
    <aside
      className={classNames('side-nav', {
        'side-nav--shown': isSideNavShown,
      })}
    >
      <div className="side-nav__header">
        <Logo />

        <button
          type="button"
          className="header__button header__burger-menu-button"
          aria-label="side-menu"
          onClick={() => {
            setIsSideNavShown(!isSideNavShown);
          }}
        >
          <span className="header__burger-menu-button-icon" />
        </button>
      </div>
      <Container>
        <div className="side-nav__content">
          <nav>
            <ul className="side-nav__nav-list">
              <Link
                to="/"
                className="side-nav__nav-link"
                onClick={() => setIsSideNavShown(false)}
              >
                Home
              </Link>

              <Link
                to="/phones"
                className="side-nav__nav-link"
                onClick={() => setIsSideNavShown(false)}
              >
                Phones
              </Link>

              <Link
                to="/tablets"
                className="side-nav__nav-link"
                onClick={() => setIsSideNavShown(false)}
              >
                Tablets
              </Link>

              <Link
                to="/accessories"
                className="side-nav__nav-link"
                onClick={() => setIsSideNavShown(false)}
              >
                Accessories
              </Link>
            </ul>
          </nav>
        </div>
      </Container>
    </aside>
  );
};
