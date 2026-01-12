import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Page not found</h1>

      <p>The page you are looking for does not exist.</p>

      <Link to="/">
        Go to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
