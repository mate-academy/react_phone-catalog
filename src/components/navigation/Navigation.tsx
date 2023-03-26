import classNames from 'classnames';
import { useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { NavLinkCustom } from '../navLink/NavLinkCustom';
import './navigastion.scss';

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
            <input
              disabled={!pathname.replace('/', '')}
              value={search}
              onChange={onChangeHandler}
              type="text"
              className="search"
              placeholder="Search in phones..."
            />
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
