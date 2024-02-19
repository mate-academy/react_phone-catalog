import { useSearchParams } from 'react-router-dom';
import debounce from 'lodash.debounce';

import './MySearch.scss';
import { CategoryName } from '../../../types/product';
import { getSearchParamsWith } from '../../../helpers/searchParams';

type Props = {
  placeholder: CategoryName;
};

export const MySearch: React.FC<Props> = ({ placeholder }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const appliedQuery = searchParams.get('query') || '';

  function setSearchWith(value: string) {
    const newParams = getSearchParamsWith({
      query: value || null,
      page: 1,
    }, searchParams);

    setSearchParams(newParams);
  }

  const applyQuery = debounce(setSearchWith, 1000);

  return (
    <div className="my-search">
      <input
        placeholder={`Search in ${placeholder}`}
        type="text"
        className="my-search__input"
        defaultValue={appliedQuery}
        onChange={event => applyQuery(event.target.value)}
      />
    </div>
  );
};
