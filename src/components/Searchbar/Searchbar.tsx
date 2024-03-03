import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Icons } from '../../types/Icons';
import { Icon } from '../Icon';
import './Searchbar.scss';
import { setSearchbar } from '../../store/reducers/ProductsSlice';
import { SearchbarProps } from './types';

export const Searchbar = memo<SearchbarProps>(({ placeholder }) => {
  const [query, setQuery] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchbar(query));
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [query, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(setSearchbar(''));
    };
  }, [dispatch]);

  return (
    <div className="searchbar">
      <input
        className="searchbar__input"
        type="text"
        placeholder={`Search in ${placeholder}`}
        onChange={e => setQuery(e.target.value)}
        value={query}
      />
      <div className="searchbar__icon">
        <Icon icon={Icons.Search} />
      </div>
    </div>
  );
});
