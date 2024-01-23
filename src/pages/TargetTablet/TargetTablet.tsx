import { Link } from 'react-router-dom';

export const TargetTablet = () => {
  return (
    <div className="NotCompleate">
      <nav className="TargetPhone_navigation">
        <Link to="/home" className="TargetPhone_navigation_home" />
        <span className="TargetPhone_navigation_text">
          {'>'}
        </span>
        <Link
          to="/tablets"
          className="TargetPhone_navigation_link"
        >
          Tablets
        </Link>
        <span className="TargetPhone_navigation_text">
          {'>'}
        </span>
        <span className="TargetPhone_navigation_text">
          Sorry, this page is not ready yet =(
        </span>
      </nav>

      <Link
        to="/phones"
        className="TargetPhone_back"
      >
        {'<  Back'}
      </Link>

      <div className="TargetPhone_conteiner">
        <h1 className="TargetPhone_conteiner_title">
          Sorry, this page is not ready yet =(
        </h1>
      </div>
    </div>
  );
};
