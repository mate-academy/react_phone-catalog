type Props = {
  handleSortBy: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  sort: string;
  handlePerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const SortOptions: React.FC<Props> = ({
  handleSortBy,
  sort,
  handlePerPageChange,
}) => {
  return (
    <article className="sortOptions">
      <div className="sortOptions__sort-box">
        <div className="sortOptions__sort">
          <label htmlFor="sortSelect" className="sortOptions__label">
            Sort by
          </label>
          <select
            id="sortSelect"
            value={sort}
            onChange={handleSortBy}
            className="sortOptions__select"
          >
            <option value="age">Newest</option>
            <option value="title">Alphabetically</option>
            <option value="price">Cheapest</option>
          </select>
        </div>

        <div className="sortOptions__page">
          <label htmlFor="pageSelect" className="sortOptions__label">
            Items on page
          </label>
          <select
            // value={perPage}
            id="pageSelect"
            defaultValue={'all'}
            onChange={handlePerPageChange}
            className="sortOptions__select"
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="all">all</option>
          </select>
        </div>
      </div>
    </article>
  );
};
