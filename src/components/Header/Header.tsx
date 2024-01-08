/* eslint-disable max-len */
import {
  Link, NavLink, useLocation, useSearchParams,
} from 'react-router-dom';
import { HeaderIcon } from '../HeaderIcon';

export const Header = () => {
  const location = useLocation();
  const [searchParams, setURLSearchParams] = useSearchParams();
  const searchValue = searchParams.get('search');

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const param = new URLSearchParams();

    param.set('onpage', searchParams.get('onpage') || 'All');

    if (!e.target.value.trim()) {
      setURLSearchParams(param);
    } else {
      param.set('search', e.target.value.toLocaleLowerCase());
      setURLSearchParams(param);
    }
  };

  const replacerPathText = () => {
    const path = location.pathname.replaceAll('/', '');
    const search = searchParams.get('item');

    return (
      <>
        <Link
          className={`path ${
            search ? 'text-primary' : 'text-secondary'
          } font-normal hover:text-primary uppercase`}
          to={`${location.pathname}`}
        >
          {path}
        </Link>
        {search && (
          <Link
            className="item text-secondary hover:text-primary uppercase"
            to={`${location.pathname}?item=${search}`}
          >
            {` > ${search}`}

          </Link>
        )}
      </>
    );
  };

  return (
    <>
      <section className=" border-b border-elements">
        <header
          className="header flex items-center max-w-[1200px] mx-auto bg-white border-r border-r-elements h-16"
        >
          <Link to="/" className="py-5 ml-6 mr-16">
            <img src="./img/svg/logo.svg" alt="logo" />
          </Link>

          <nav className="flex items-center gap-16 h-full mr-auto">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'navlink navlink-active' : 'navlink')}
            >
              home
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? 'navlink navlink-active' : 'navlink')}
              to="/phones"
            >
              phones
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? 'navlink navlink-active' : 'navlink')}
              to="/tablets"
            >
              tablets
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? 'navlink navlink-active' : 'navlink')}
              to="/accessories"
            >
              accessories
            </NavLink>
          </nav>

          {location.pathname !== '/' && location.pathname !== '/cart' && (
            <label className="flex items-center pl-6 h-16 border-l border-elements">
              <input
                autoComplete="off"
                type="search"
                name="search"
                id="headerSearch"
                placeholder="Search in phones..."
                className="border-none outline-none focus:outline-none"
                value={searchValue || ''}
                onChange={(e) => searchHandler(e)}
              />
              <div>
                <img className="p-6" src="./img/svg/search.svg" alt="search" />
              </div>
            </label>
          )}
          <HeaderIcon type="favourites" styleName="headerIcon" />
          <HeaderIcon type="cart" styleName="headerIcon" />
        </header>
      </section>

      {location.pathname !== '/' && (
        <div className="flex max-w-[1136px] mx-auto mt-6 mb-10 gap-2">
          <img src="./img/svg/home.svg" alt="home" />
          <p className="header-path">{replacerPathText()}</p>
        </div>
      )}
    </>
  );
};
