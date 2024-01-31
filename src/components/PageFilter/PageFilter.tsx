import './PageFilter.scss';

export const PageFilter = () => {
  return (
    <div className="page-filter">
      <div className="page-filter__sort-by">
        <label
          htmlFor="sort-by"
          className="page-filter__label"
        >
          Sort by
        </label>

        <select
          name="sort-by"
          id="sort-by"
          className="page-filter__select"
        >
          <option value="newest">
            Newest
          </option>
          <option value="rate">
            Top rated
          </option>
          <option value="price-to-high">
            Price: low to high
          </option>
          <option value="price-to-low">
            Price: high to low
          </option>
        </select>
      </div>

      <div className="page-filter__item-count-filter">
        <label
          htmlFor="item-on-page"
          className="page-filter__label"
        >
          Items on page
        </label>
        <select
          name="item-on-page"
          id="item-on-page"
          className="page-filter__select"
        >
          <option value="16">16</option>
          <option value="16">34</option>
          <option value="16">42</option>
        </select>
      </div>
    </div>
  );
};
