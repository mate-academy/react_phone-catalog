import { useSearchParams } from 'react-router-dom';

export const SortForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sortBy') || 'age';
  const itemsPerPage = searchParams.get('perPage') || 'All';

  const hendlerSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  };

  const hendlerItemsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('perPage', e.target.value);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  return (
    <form className="form productPage__sortForm">
      <div>
        <p className="form__label">
          Sort by
        </p>
        <select
          onChange={hendlerSortBy}
          className="form__select form__select--sort"
          value={sortBy}
        >
          <option value="age">Newest</option>
          <option value="name">Alphabetically</option>
          <option value="price">Cheapest</option>
        </select>
      </div>
      <div>
        <p className="form__label">
          Items on page
        </p>
        <select
          onChange={hendlerItemsPerPage}
          className="form__select form__select--itemPerPage"
          value={itemsPerPage}
        >
          <option value="All">All</option>
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="16">16</option>
        </select>
      </div>
    </form>
  );
};
