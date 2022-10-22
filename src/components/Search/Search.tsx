import './Search.scss';

type Props = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  applyQuery: (query: string) => void,
  pageName: string | null;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export const Search: React.FC<Props> = ({
  query,
  setQuery,
  applyQuery,
  pageName,
  setCurrentPage,
}) => {
  const handlerInputOnChange = (newQuery: string) => {
    setQuery(newQuery);
    applyQuery(newQuery);
  };

  const handlerInputKeyDown = (key: string) => {
    setCurrentPage(1);
    if (key !== 'Enter') {
      return;
    }

    setQuery('');
    applyQuery('');
  };

  const handlerCrossButtonClick = () => {
    setCurrentPage(1);
    setQuery('');
    applyQuery('');
  };

  return (
    <div className="Search">
      <input
        type="text"
        value={query}
        className="Search__input text"
        placeholder={`Search in ${pageName}...`}
        onChange={(e) => handlerInputOnChange(e.currentTarget.value)}
        onKeyDown={(e) => handlerInputKeyDown(e.key)}
      />
      {query
        && (
          <button
            data-cy="searchDelete"
            aria-label="searchDelete"
            type="button"
            className="cross-button Search__button"
            onClick={handlerCrossButtonClick}
          />
        )}
    </div>
  );
};
