import styles from './SearchForm.module.scss';
import stylesIcon from '../../styles/icon.module.scss';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { querySlice } from '../../features/querySlice';
import { useLocation } from 'react-router-dom';

export const SearchForm = () => {
  const { query } = useAppSelector(state => state.query);
  const { darkTheme } = useAppSelector(state => state.darkTheme);
  const dispatch = useAppDispatch();
  const [isClicked, setIsClicked] = useState(false);
  const location = useLocation();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsClicked(prev => !prev);
  };

  useEffect(() => {
    setIsClicked(false);
  }, [location.pathname]);

  return (
    <div className={styles.searchForm__container}>
      {isClicked ? (
        <form className={styles.searchForm} onSubmit={handleSearch}>
          <input
            className={styles.searchForm__input}
            type="text"
            placeholder="Search..."
            value={query}
            onChange={e =>
              dispatch(querySlice.actions.setQuery(e.target.value))
            }
            onKeyDown={e => {
              if (e.key === 'Escape') {
                setIsClicked(prev => !prev);
                dispatch(querySlice.actions.setQuery(''));
              }
            }}
            autoFocus
          />
        </form>
      ) : (
        <div
          className={`${stylesIcon.icon__nav} ${stylesIcon.icon} ${darkTheme ? stylesIcon.icon__search__dark : stylesIcon.icon__search}`}
          onClick={() => {
            setIsClicked(prev => !prev);
          }}
        ></div>
      )}
    </div>
  );
};
