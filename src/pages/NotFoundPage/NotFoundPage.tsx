import { Link } from 'react-router-dom';
import './NotFoundPage.scss';

export const NotFoundPage = () => {
  return (
    <div className="container notFoundPage">
      <h1>Unfortunately, we did not find such a page on our site.</h1>
      <p>
        You can go to the&nbsp;
        <Link to="/">
          home page
        </Link>
        .
      </p>
    </div>
  );
};
