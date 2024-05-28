import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { useAppSelector, useWindowDimensions } from '../../../hooks/hooks';
import heart from './../../../images/icons/favorite.svg';
import shop from './../../../images/icons/shop.svg';
import styles from './Tools.module.scss';
import { getTotalAmountOfItems } from '../../../helpers/helpers';
import classNames from 'classnames';
import { Product } from '../../../utils/types/Product';
import search from './../../../images/icons/search.svg';
import close from './../../../images/icons/closeBar.svg';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useRef, useState } from 'react';
import { TABLET_SIZE } from '../../../consts/consts';

export const Tools = () => {
  const { width } = useWindowDimensions();

  const [searchParams, setSearchParams] = useSearchParams();

  const [openSearch, setOpenSearch] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const query = searchParams.get('query') || '';

  const activeLink = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.header__tools__button, {
      [styles.header__tools__button_active]: isActive,
    });

  const [appliedQuery, setAppliedQuery] = useState(query);

  const [value, setValue] = useState(query);

  const applyQuery = useCallback(debounce(setAppliedQuery, 1000), []);

  const { pathname } = useLocation();

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    applyQuery(e.target.value);
  };

  useEffect(() => {
    searchParams.set('query', appliedQuery);
    if (!appliedQuery.trim()) {
      searchParams.delete('query');

      setValue('');
      applyQuery('');
    }

    // searchParams.set('page', '1');
    setSearchParams(searchParams);
  }, [appliedQuery, applyQuery]);

  const isShowSearch =
    pathname === '/phones' ||
    pathname === '/tablets' ||
    pathname === '/accessories';

  const favoritesItems: Product[] = useAppSelector(state => state.favorites);

  const cartItems: Product[] = useAppSelector(state => state.cart.items);

  const amountOfProducts: number = getTotalAmountOfItems(cartItems);

  const toggleInputSearch = () => {
    setOpenSearch(searchInput => !searchInput);
    if (inputRef.current && !openSearch) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={styles.header__tools_wrapper}>
      {isShowSearch && width > TABLET_SIZE && (
        <>
          <button
            className={classNames(styles.header__tools__toggle_search)}
            onClick={toggleInputSearch}
          >
            {!openSearch ? (
              <img src={search} alt="Search icon" />
            ) : (
              <img src={close} alt="Close icon" />
            )}
          </button>
          <div
            className={classNames(styles.header__tools_search, {
              [styles.header__tools_search_open]: openSearch,
            })}
          >
            <input
              type="text"
              ref={inputRef}
              value={value}
              onChange={handleQueryChange}
              className={styles.header__tools_input_search}
              placeholder="Search..."
            />
          </div>
        </>
      )}
      <NavLink to="/favorites" className={activeLink}>
        <div className={styles.header__tools_tool}>
          <img src={heart} alt="Heart" />
          {favoritesItems.length > 0 && (
            <span className={styles.header__tools_count}>
              {favoritesItems.length}
            </span>
          )}
        </div>
      </NavLink>
      <NavLink to="/cart" className={activeLink}>
        <div className={styles.header__tools_tool}>
          <img src={shop} alt="Shop" />
          {amountOfProducts > 0 && (
            <span className={styles.header__tools_count}>
              {amountOfProducts}
            </span>
          )}
        </div>
      </NavLink>
    </div>
  );
};
