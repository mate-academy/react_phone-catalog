import { useSearchParams } from 'react-router-dom';

export const Sort = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || 'newest';
  const perPage = searchParams.get('perPage') || '16';

  const handleSortChange = (newSort: string) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set('sort', newSort);
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const handlePerPageChange = (newPerPage: string) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set('perPage', newPerPage);
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  return (
    <div className="sort catalog__sort">
      <form className="sort__form" onSubmit={e => e.preventDefault()}>
        <label htmlFor="sort-by" className="sort__label">
          Sort by
          <select
            value={sortBy}
            name="sort-by"
            id="sort-by"
            onChange={e => handleSortChange(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="alphabetically">Alphabetically</option>
            <option value="cheapest">Cheapest</option>
          </select>
        </label>

        <label htmlFor="items-on-page" className="sort__label">
          Items on page
          <select
            value={perPage}
            name="items-on-page"
            id="items-on-page"
            onChange={e => handlePerPageChange(e.target.value)}
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="all">all</option>
          </select>
        </label>
      </form>
    </div>
  );
};
