import { Link } from 'react-router-dom';

type Props = {
  firstLvl: string;
  secondLvl?: string;
};

export const NavigationPath: React.FC<Props> = ({ firstLvl, secondLvl }) => {
  return (
    <div className="navigationPath">
      <Link to="/home" className="navigationPath__home">
        <img src="img/icons/home.svg" alt="home" />
      </Link>
      <img
        src="img/icons/arrow-right.svg"
        alt="arrow right"
        className="navigationPath__arrow-right"
      />
      {secondLvl ? (
        <Link to={`/${firstLvl.toLowerCase()}`}>
          <p className="navigationPath__text navigationPath__text--active">
            {firstLvl}
          </p>
        </Link>
      ) : (
        <p className="navigationPath__text">{firstLvl}</p>
      )}

      {secondLvl && (
        <>
          <img
            src="img/icons/arrow-right.svg"
            alt="arrow right"
            className="navigationPath__arrow-right"
          />
          <p className="navigationPath__text">{secondLvl}</p>
        </>
      )}
    </div>
  );
};
