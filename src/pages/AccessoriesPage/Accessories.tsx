import { Link } from "react-router-dom";

export const AccessoriesPage = () => {
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

        <p>Accessories</p>
      </div>

      <h1 className="Phones-page__Header">Accessories</h1>

      <p>{`${[].length} models`}</p>

      <div className="Cards__list">Work in progres...</div>
    </div>
  );
};
