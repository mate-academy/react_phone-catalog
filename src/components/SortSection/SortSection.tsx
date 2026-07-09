import './SortSection.scss';

type Props = {
  total: number;
  sortBy: string;
  itemsPerPage: number;
  onSortChange: (value: any) => void;
  onItemsChange: (value: number) => void;
};

export const SortSection = ({
                              total,
                              sortBy,
                              itemsPerPage,
                              onSortChange,
                              onItemsChange,
                            }: Props) => {
  return (
    <div className="sort-section">
      <h1>Accessories</h1>
      <p className="sort-section__models">{total} models</p>

      <div className="sort-section__filters">
        <div className="sort-section__filters__filter">
          <label className="sort-section__filters__filter__label">Sort by</label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="sort-section__filters__filter__select"
          >
            <option value="newest">Newest</option>
            <option value="cheap">Cheapest</option>
            <option value="alpha">Alphabetically</option>
          </select>
        </div>

        <div className="sort-section__filters__filter">
          <label className="sort-section__filters__filter__label">Items on page</label>
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsChange(Number(e.target.value))}
            className="sort-section__filters__filter__select"
          >
            <option value={16}>16</option>
            <option value={24}>24</option>
            <option value={32}>32</option>
            <option value={64}>64</option>
            <option value={1000}>all</option>
          </select>
        </div>
      </div>
    </div>
  );
};
