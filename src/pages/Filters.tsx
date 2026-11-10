import './Filters.scss';

interface FiltersProps {
  quantity: number;
}

const Filters = ({ quantity }: FiltersProps) => {
  return (
    <div className="filters">
      <span className="filters__quantity">{quantity} models</span>
      <div className="filters__categories">
        <div className="filters__category">
          <span className="filters__category-title">Sort by</span>
          <select className="filters__select">
            <option value="newest" defaultChecked>
              Newest
            </option>
            <option value="price">Price</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
        <div className="filters__category">
          <span className="filters__category-title">Items on page</span>
          <select className="filters__select">
            <option value="8" defaultChecked>
              8
            </option>
            <option value="16">16</option>
            <option value="32">32</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
