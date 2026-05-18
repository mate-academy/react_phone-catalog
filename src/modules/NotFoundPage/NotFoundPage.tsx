import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '100px 20px' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '24px' }}>Page not found</h1>
      <Link
        to="/"
        style={{ color: '#fff', textDecoration: 'underline', fontSize: '18px' }}
      >
        Go to Home page
      </Link>
    </div>
  );
};
