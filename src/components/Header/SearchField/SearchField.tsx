import { useSearchParams } from 'react-router-dom';
import style from './SearchFiead.module.scss';
import { QueryParams } from '../../../enums/QuryParams';

export const SearchField = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const query = searchParams.get(QueryParams.query) || '';

  return (
    <div className={style.search}>
      <input
        value={query}
        onChange={e => {
          params.set(QueryParams.query, e.target.value);
          setSearchParams(params);
        }}
        type="search"
        placeholder="Search.."
        autoComplete="off"
        className={style.search__field}
      />
    </div>
  );
};
