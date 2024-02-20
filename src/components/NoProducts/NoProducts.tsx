import { Link } from 'react-router-dom';
import './NoProducts.scss';

// type Props = {
//   categotyName: string,
// };

export const NoProducts:React.FC = ({
  // categotyName,
  children,
}) => {
  return (
    <div className="no-results">
      <div className="no-results__text">
        {children}
        {/* <span className="no-results__text">
          {`${categotyName} not found.`}
        </span>
        <span className="no-results__text">
          We apologise for the inconvenience.
        </span> */}
      </div>

      <Link
        to="/"
        className="no-results__back-home-btn"
      >
        Return to home page
      </Link>
    </div>
  );
};
