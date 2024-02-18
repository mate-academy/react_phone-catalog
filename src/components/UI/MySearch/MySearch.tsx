import { useSearchParams } from 'react-router-dom';
import { CategoryName } from '../../../types/product';
import './MySearch.scss';
import { getSearchParamsWith } from '../../../helpers/searchParams';

type Props = {
  placeholder: CategoryName;
};

export const MySearch: React.FC<Props> = ({ placeholder }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  function setSearchWith(value: string) {
    const newParams = getSearchParamsWith({
      query: value || null,
      page: 1,
    }, searchParams);

    setSearchParams(newParams);
  }

  return (
    <div className="my-search">
      <input
        placeholder={`Search in ${placeholder}`}
        type="text"
        className="my-search__input"
        value={query}
        onChange={event => setSearchWith(event.target.value)}
      />
    </div>
  );
};
