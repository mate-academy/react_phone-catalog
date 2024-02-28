/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import {
  useCallback,
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';
import { NavigationLink } from '../NavigationLink';
import { debounce } from '../../helpers/functions';
import { NewParamsProps } from '../../types/NewParams';
import { IMAGES } from '../../images-style/images';

type NavigationProps = {
  addParam: (newParams: NewParamsProps) => void;
  favLength: number,
  cartLength: number,
};

export const Navigation: React.FC<NavigationProps> = ({
  addParam,
  favLength,
  cartLength,
}) => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [newQuery, setNewQuery] = useState(query || '');

  const pathToCheck = pathname.replace('/', '');

  function checkPath(path: string) {
    switch (true) {
      case path === 'phones':
      case path === 'tablets':
      case path === 'accessories':
      case path === 'favorites':
        return true;

      default:
        return false;
    }
  }

  const applyQuery = useCallback(debounce(addParam, 1000), [pathname]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewQuery(e.target.value);
    applyQuery({
      query: e.target.value,
      perPage: searchParams.get('perPage'),
      sort: searchParams.get('sort'),
    });
  };

  const deleteQuery = () => {
    setNewQuery('');
    applyQuery({
      query: '',
      perPage: searchParams.get('perPage'),
      sort: searchParams.get('sort'),
    });
  };

  useEffect(() => {
    return () => {
      setNewQuery('');
    };
  }, [pathname]);

  return (
    <nav className="nav" id="nav">
      <div className="nav__buying-categories">
        <Link to="/" className="logo">
          <img
            className="logo__img"
            src={IMAGES.logo}
            alt="Logo"
          />
        </Link>
        <NavigationLink
          to="/"
          name="Home"
          extraClass="nav__link--left"
        />
        <NavigationLink
          to="/phones"
          name="Phones"
          extraClass="nav__link--left"
        />
        <NavigationLink
          to="/tablets"
          name="Tablets"
          extraClass="nav__link--left"
        />
        <NavigationLink
          to="/accessories"
          name="Accessories"
          extraClass="nav__link--left"
        />
      </div>

      <div className="nav__search-and-saving-categories">
        {checkPath(pathToCheck) && (
          <div className="nav__search-section">
            <input
              type="search"
              value={newQuery}
              className="nav__search"
              placeholder={`Search in ${pathToCheck}...`}
              onChange={(e) => handleQueryChange(e)}
            />

            <button
              type="button"
              data-cy="searchDelete"
              className={classNames('nav__search-picture-and-delete',
                newQuery
                  ? 'nav__search-picture-and-delete--close'
                  : 'nav__search-picture-and-delete--search')}
              onClick={() => {
                if (query) {
                  deleteQuery();
                }
              }}
            />
          </div>
        )}

        <div className="nav__saving-categories">
          <NavigationLink
            to="/favorites"
            extraClass="nav__link--favorites nav__link--right"
          >
            {favLength > 0 && (
              <div className="nav__link-count">
                {favLength}
              </div>
            )}
          </NavigationLink>
          <NavigationLink
            to="/cart"
            extraClass="nav__link--cart nav__link--right"
          >
            {cartLength > 0 && (
              <div className="nav__link-count">
                {cartLength}
              </div>
            )}
          </NavigationLink>
        </div>
      </div>
    </nav>
  );
};
