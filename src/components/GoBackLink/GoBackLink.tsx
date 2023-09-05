import { Link } from 'react-router-dom';
import './go-back-link.scss';

export const GoBackLink = () => {
  return (
    <Link
      className="go-back-link"
      to=".."
    >
      <img
        className="go-back-link__arrow"
        src="./img/icons/LeftArrow.svg"
        alt="Left Arrow"
      />

      <div className="go-back-link__text">
        Back
      </div>
    </Link>
  );
};
