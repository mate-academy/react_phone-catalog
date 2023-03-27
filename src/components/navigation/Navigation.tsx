import classNames from 'classnames';
import { useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { NavLinkCustom } from '../navLink/NavLinkCustom';
import './navigastion.scss';

enum CatalogsNames {
  'Phone' = 'phones',
  'Tablet' = 'tablets',
  'Accessor' = 'accessories',
  'Favorite' = 'favorites',
}

type Props = {
  favorite: number;
  shoping: number;
};

export const Navigation: React.FC<Props> = ({ favorite, shoping }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();
  const [search, setSearch] = useState(searchParams.get('query') || '');

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchParams.set('query', event.target.value);
    setSearch(event.target.value);
    setSearchParams(searchParams);
    if (!event.target.value) {
      searchParams.delete('query');
      setSearchParams(searchParams);
    }
  };

  const clearSearch = () => {
    setSearch('');
    searchParams.delete('query');
    setSearchParams(searchParams);
  };

  const isCatalog = useMemo(() => {
    if (pathname.includes(CatalogsNames.Phone)
    || pathname.includes(CatalogsNames.Tablet)
    || pathname.includes(CatalogsNames.Accessor)
    || pathname.includes(CatalogsNames.Favorite)
    ) {
      return false;
    }

    return true;
  }, [pathname]);

  return (
    <nav className={classNames('navigation', {
      'shopping-page': pathname.includes('shopping'),
    })}
    >
      {!pathname.includes('shopping') ? (
        <>
          <div className="wrapper">
            <NavLinkCustom text="home" way="/" classStyle="nav-link" />
            <NavLinkCustom text="phones" way="/phones" classStyle="nav-link" />
            <NavLinkCustom
              text="tablets"
              way="/tablets"
              classStyle="nav-link"
            />
            <NavLinkCustom
              text="accessories"
              way="/accessories"
              classStyle="nav-link"
            />
          </div>
          <div className="wrapper-link-icon">
            <label className="search">
              <input
                className={classNames({
                  hidden: isCatalog,
                })}
                value={search}
                onChange={onChangeHandler}
                type="text"
                placeholder="Search in phones..."
              />
              {search && (
                <button
                  className={classNames('clear', {
                    hidden: isCatalog,
                  })}
                  data-cy="searchDelete"
                  type="button"
                  onClick={clearSearch}
                >
                  <img src="./img/icons/Close.png" alt="close" />
                </button>
              )}
              <img
                className={classNames({
                  hidden: isCatalog,
                })}
                src="./img/icons/Search.png"
                alt="search"
              />
            </label>
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

        </>
      )
        : (
          <NavLinkCustom
            way="/shopping"
            classStyle="nav-link link-shopping "
          >
            <div className="count">{shoping}</div>
          </NavLinkCustom>
        )}
    </nav>
  );
};
