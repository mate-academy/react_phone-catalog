type Props = {
  handleSortBy: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handlePerPage: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const SortOptions: React.FC<Props> = ({
  handleSortBy,
  handlePerPage,
}) => {
  return (
    <article className="sortOptions">
      <div className="sortOptions-sort">
        <span>Sort by:</span>
        <select onChange={handleSortBy} defaultValue={'newest'}>
          <option value="newest">Newest</option>
          <option value="alphabetically">Alphabetically</option>
          <option value="cheapest">Cheapest</option>
        </select>
      </div>
      <div className="sortOptions-perPage">
        <span>Items on page:</span>
        <select onChange={handlePerPage} defaultValue={'all'}>
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="16">16</option>
          <option value="all">all</option>
        </select>
      </div>
    </article>
  );
};
