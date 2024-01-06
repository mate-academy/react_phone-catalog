/* eslint-disable max-len */
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import _debounce from 'lodash/debounce';
import { Params, getSearchWith } from '../../helpers/getFunctions/getSearch';
import './Search.scss';
import { useAppDispatch } from '../../store/hooks';
import { setQuery } from '../../features/querySlice';
import { ButtonEvent } from '../../elements/Buttons/ButtonEvent/ButtonEvent';

type Props = {
  page: string;
};

export const Search: React.FC<Props> = ({ page }) => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const applyQuery = useMemo(() => (_debounce((newQuery: string) => dispatch(setQuery(newQuery)), 1000)), [dispatch]);

  function setParams(params: Params) {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    applyQuery(e.target.value);
    setParams({ query: e.currentTarget.value || null });
    searchParams.set('query', e.target.value);
    setParams({ page: '1' });
  };

  const reset = () => {
    applyQuery('');
    setParams({ query: null });
  };

  return (
    <div className="search">
      <input
        type="text"
        className="search__input"
        value={query}
        placeholder={`Search in ${page}...`}
        onChange={handleChange}
      />

      <ButtonEvent
        shape={query.length === 0 ? 'loop' : 'close'}
        onClick={reset}
        dynamicClasses={['big', 'no-border']}
      />
    </div>
  );
};
