import { useSearchParams } from 'react-router-dom';
import { useContext, useMemo } from 'react';
import _debounce from 'lodash/debounce';
import { ProductsContext } from '../../store/ProductsContext';
import { Params, getSearchWith } from '../../helpers/utils/getSearch';
import { ButtonIcon } from '../../elements/ButtonIcon/ButtonIcon';
import './Search.scss';

type Props = {
  page: string;
};

export const Search: React.FC<Props> = ({ page }) => {
  const { setQuery } = useContext(ProductsContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const applyQuery = useMemo(() => (_debounce(setQuery, 1000)), [setQuery]);

  function setParams(params: Params) {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    applyQuery(e.target.value);
    setParams({ query: e.currentTarget.value || null });
    searchParams.set('query', e.target.value);
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
        placeholder={`Search in ${page}`}
        onChange={handleChange}
      />

      <ButtonIcon
        type="event"
        shape={query.length === 0 ? 'loop' : 'close'}
        onClick={reset}
        dynamicClasses={['big', 'no-border']}
      />
    </div>
  );
};
