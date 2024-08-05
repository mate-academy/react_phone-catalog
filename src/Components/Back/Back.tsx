import { Link } from 'react-router-dom';
import './Back.scss';

export const Back = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="back">
      <div className="back__icon-arrow-right" />
      <Link to="#" className="back__return-text" onClick={goBack}>
        Back
      </Link>
    </div>
  );
};
