import './Filters.scss';

interface FiltersProps {
  quantity: number;
  setItemsOnPage: (itemsOnPage: number) => void;
  setFilter: (filter: string) => void;
}

const Filters = ({ quantity, setItemsOnPage, setFilter }: FiltersProps) => {
  return (
    <div className="filters">
      <span className="filters__quantity">{quantity} models</span>
      <div className="filters__categories">
        <div className="filters__category">
          <span className="filters__category-title">Sort by</span>
          <select
            className="filters__select"
            onChange={e => setFilter(e.target.value)}
          >
            <option value="newest" defaultChecked>
              Newest
            </option>
            <option value="price">Price</option>
            {/*             <option value="alphabetical">Alphabetical</option> */}
          </select>
        </div>
        <div className="filters__category">
          <span className="filters__category-title">Items on page</span>
          <select
            className="filters__select"
            onChange={e => setItemsOnPage(Number(e.target.value))}
          >
            <option value="16" defaultChecked>
              16
            </option>
            <option value="8">8</option>
            <option value="32">32</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
