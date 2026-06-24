import { Link } from 'react-router-dom';

export const NotFoundPage = () => (
  <section>
    <h1>Page not found</h1>
    <p>
      <Link to="/">Go back home</Link>
    </p>
  </section>
);
