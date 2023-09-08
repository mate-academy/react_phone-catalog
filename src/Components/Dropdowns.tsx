import '../style/main.scss';

export const Dropdowns = () => {
  return (
    <div className="dropdowns">
      <div className="sortBy">
        <p>Sort by</p>
        <select className="dropdowns__sort">
          <option value="age">Newest</option>
          <option value="name">Alphabetically</option>
          <option value="price">Cheapest</option>
        </select>
      </div>

      <div className="items">
        <p>Items on page</p>
        <select className="dropdowns__sort" data-cy="paginationLeft">
          <option value="age">4</option>
          <option value="age">8</option>
          <option value="name">16</option>
          <option value="price">All</option>
        </select>
      </div>
    </div>
  );
};
