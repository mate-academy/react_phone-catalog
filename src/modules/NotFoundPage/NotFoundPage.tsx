import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <main>
      <h1>Page not found</h1>

      <p>Sorry, the page you requested does not exist.</p>

      <Link to="/">Back to Home</Link>
    </main>
  );
};
