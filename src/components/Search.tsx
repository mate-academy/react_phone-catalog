import { useSearchParams } from 'react-router-dom';
import { memo } from 'react';

type Props = {
  pathName: string;
};

export const Search:React.FC<Props> = memo(({ pathName }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const handleChangeQuery = (value: string) => {
    if (!value) {
      searchParams.delete('query');
    } else {
      searchParams.set('query', value);
    }

    setSearchParams(searchParams);
  };

  return (
    <div className="search">
      <input
        type="search"
        placeholder={`search in ${pathName}...`}
        value={query}
        onChange={(e) => handleChangeQuery(e.target.value)}
      />
      {query && (
        <button
          type="button"
          onClick={() => handleChangeQuery('')}
          className="cart__item--remove"
        >
          <img
            src="assests/images/Close.svg"
            alt="icon-minus"
          />
        </button>
      )}

      <img src="assests/images/Search.svg" alt="search icon" />
    </div>
  );
});
