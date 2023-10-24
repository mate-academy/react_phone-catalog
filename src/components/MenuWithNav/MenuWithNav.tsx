import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import { Header } from '../Header/Header';
import './MenuWithNav.scss';
import { NamesByHeader } from '../../types/NamesByHeader';
import { NamesByLinks } from '../../types/NamesByLinks';
import { getState } from '../../helpers/getState';
import {
  DEF_CONTACTS,
  DEF_SORT,
  GITHUB_REPO,
} from '../../helpers/consts';

type Props = {
  quantityLiked: number,
  quantityAdded: number,
  onSetIsMenu: (isMenu: boolean) => void,
};

export const MenuWithNav: React.FC<Props> = ({
  quantityLiked, quantityAdded, onSetIsMenu,
}) => {
  const { pathname, search } = useLocation();

  const getClassForLink = ({ isActive }: { isActive: boolean }) => {
    return classNames(
      'menu__link',
      { 'is-active': isActive },
    );
  };

  const handlerClickLink = () => {
    onSetIsMenu(false);
  };

  return (
    <section className="menu">
      <Header
        onSetIsMenu={onSetIsMenu}
        isMenu
      />

      <div className="container">
        <nav className="menu__nav">
          <ul className="menu__list">
            <li className="menu__item">
              <NavLink
                to="/"
                end
                className={getClassForLink}
                onClick={handlerClickLink}
                state={getState(pathname, search)}
              >
                {NamesByHeader.Home}
              </NavLink>
            </li>

            <li className="menu__item">
              <NavLink
                to={NamesByLinks.Phones + DEF_SORT}
                end
                className={getClassForLink}
                onClick={handlerClickLink}
                state={getState(pathname, search)}
              >
                {NamesByHeader.Phones}
              </NavLink>
            </li>

            <li className="menu__item">
              <NavLink
                to={NamesByLinks.Tablets + DEF_SORT}
                end
                className={getClassForLink}
                onClick={handlerClickLink}
                state={getState(pathname, search)}
              >
                {NamesByHeader.Tablets}
              </NavLink>
            </li>

            <li className="menu__item">
              <NavLink
                to={NamesByLinks.Accessories + DEF_SORT}
                end
                className={getClassForLink}
                onClick={handlerClickLink}
                state={getState(pathname, search)}
              >
                {NamesByHeader.Accessories}
              </NavLink>
            </li>

            <li className="menu__item menu__item--space">
              <NavLink
                to={NamesByLinks.Favourites}
                end
                className={getClassForLink}
                onClick={handlerClickLink}
                state={getState(pathname, search)}
              >
                {quantityLiked !== 0 ? (
                  <div className="menu__link-with-number">
                    <p>{NamesByHeader.Favourites}</p>

                    <p className="menu__small-quantity">
                      {quantityLiked}
                    </p>
                  </div>

                ) : (
                  NamesByHeader.Favourites
                )}
              </NavLink>
            </li>

            <li className="menu__item">
              <NavLink
                to={NamesByLinks.Cart}
                end
                className={getClassForLink}
                onClick={handlerClickLink}
                state={getState(pathname, search)}
              >
                {quantityAdded !== 0 ? (
                  <div className="menu__link-with-number">
                    <p>{NamesByHeader.Card}</p>

                    <p className="menu__small-quantity">
                      {quantityAdded}
                    </p>
                  </div>

                ) : (
                  NamesByHeader.Card
                )}
              </NavLink>
            </li>

            <li className="menu__item menu__item--space">
              <div
                className="menu__link"
                title={DEF_CONTACTS}
              >
                {NamesByHeader.Contacts}
              </div>
            </li>

            <li className="menu__item">
              <NavLink
                to={GITHUB_REPO}
                end
                className="menu__link"
              >
                {NamesByHeader.Github}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
};
