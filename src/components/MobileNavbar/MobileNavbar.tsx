/* eslint-disable */
import {
  useSearchParams,
  NavLink,
  useLocation,
} from 'react-router-dom';
import classNames from 'classnames';
import './MobileNavbar.scss';
import {
  useContext,
  useEffect,
} from 'react';
import { StateContext } from '../../AppContext';

type Props = {
  onClick: (trigger: boolean) => void;
};

const MobileNavbar: React.FC<Props> = ({ onClick }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('text-navbar', { 'selected-link-mob': isActive });

  const linkClassIcons = ({ isActive }: { isActive: boolean }) =>
    classNames('centrum', { 'selected-icons-mob ': isActive });

  const location = useLocation();

  const { state } = useContext(StateContext);

  function customLinkClass(filedName: string) {
    return location.pathname.includes(filedName);
  }

  function homeLinkClass() {
    return location.pathname === '/';
  }

  useEffect(() => {
    params.delete('search');
    setSearchParams(params);
  }, [location.pathname]);

  return (
    <div className="navbar-total-mob">
      <div className="logo-box-mob mb-32">
        <div className="ml-24 centrum">
          <img src="./img/icons/logo2.svg" alt="img" />
        </div>
        <div className="centrum close-button">
          <img
            src="./img/icons/closeBlack.svg"
            alt="img"
            onClick={() => onClick(false)}
          />
        </div>
      </div>
      <div className="links-icons">
        <div className="navbar-mob">
          <div className="navbar--flex-mob">
            <div className="navbar-mob">
              <div
                className={classNames('navbar-box-item-mob', {
                  'selected-nav-mob': homeLinkClass(),
                })}
              >
                <NavLink to="/" className={linkClass}>
                  Home
                </NavLink>
              </div>

              <div
                className={classNames('navbar-box-item-mob', {
                  'selected-nav-mob': customLinkClass('phones'),
                })}
              >
                <NavLink to="/phones" className={linkClass}>
                  Phones
                </NavLink>
              </div>

              <div className="navbar-box-item-mob">
                <NavLink to="/tablets" className={linkClass}>
                  Tablets
                </NavLink>
              </div>

              <div className="navbar-box-item-mob">
                <NavLink to="/accessoires" className={linkClass}>
                  Accessoires
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        <div className="navbar-icons-mob">

          <div className="navbar_icon-mob">
            <div className="half">
              <NavLink to="/favourites" className={linkClassIcons}>
                <img src="./img/icons/icon_1.svg" alt="img" />
                {state.favourites.length > 0 && (
                  <div className="red-circle-box-mob">
                    <div className="red-circle-mob">
                      {state.favourites.length}
                    </div>
                  </div>
                )}
              </NavLink>
            </div>
          </div>

          <div className="navbar_icon-mob line-between-icons">
            <div className="half ">
              <NavLink to="/cart" className={linkClassIcons}>
                  <img src="./img/icons/icon_2.svg" alt="img" />
                  {state.card.length > 0 && (
                    <div className="red-circle-box-mob">
                      <div className="red-circle-mob">
                        {state.card.length}
                      </div>
                    </div>
                  )}
              </NavLink>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
