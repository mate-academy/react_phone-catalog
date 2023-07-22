import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className="container">
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Go to Homepage</Link>
    </div>
  );
};
