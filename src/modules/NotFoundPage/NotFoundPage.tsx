import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <section style={{ padding: 24, textAlign: 'center' }}>
      <h1>Page not found</h1>
      <p>
        <Link to="/">Go back to Home</Link>
      </p>
    </section>
  );
};
