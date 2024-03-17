import { Link } from "react-router-dom";

export const TabletsPage = () => {
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

      <h1 className="Phones-page__Header">Tablets</h1>

      <p>{`${[].length} models`}</p>

      <div className="Cards__list">Work in progres...</div>
    </div>
  );
};
