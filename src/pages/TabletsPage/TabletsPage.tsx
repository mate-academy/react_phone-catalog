import { Link } from "react-router-dom";

export const TabletsPage = () => {
  const options = ["All", "4", "8", "16"];
  const sortType = ["Newest", "Alphabetically", "Cheapest"];

  return (
    <div className="Phones-page">
      <div className="top-link" data-cy="breadCrumbs">
        <Link to="/">
          <img src="./img/Home.png" alt="Home" className="top-link__img" />
        </Link>

        <img
          src="./img/UpperLink.png"
          alt="ArrowRight"
          className="top-link__img"
        />

        <p>Tablets</p>
      </div>

      <h1 className="Phones-page__header">Tablets</h1>

      <p>{`${[].length} models`}</p>

      <div className="Options">
        <div className="Options__sort">
          <label htmlFor="sort-options">Sort by</label>

          <select className="selector__sort" id="sort-options">
            {sortType.map((type) => (
              <option value={type} key={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="Options__count">
          <label htmlFor="count-options">Items on page</label>

          <select className="selector__count" id="count-options">
            {options.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="Cards__list">Work in progres...</div>
    </div>
  );
};
