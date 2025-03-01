import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import './SearchForm.scss';
import { querySlice } from '../../features/querySlice';
import { useLocation } from 'react-router-dom';

export const SearchForm = () => {
  const { query } = useAppSelector(state => state.query);
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
    <div className="search-form__container">
      {isClicked ? (
        <form className="search-form" onSubmit={handleSearch}>
          <input
            className="search-form__input"
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
          className="icon__nav icon icon--search"
          onClick={() => {
            setIsClicked(prev => !prev);
          }}
        ></div>
      )}
    </div>
  );
};
