import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <section
      className="not-found-page"
      style={{ textAlign: 'center', padding: '60px 20px' }}
    >
      <h1 style={{ fontSize: '72px', margin: '0 0 20px' }}>404</h1>
      <h2 style={{ margin: '0 0 20px' }}>Page Not Found</h2>
      <p style={{ marginBottom: 30, color: '#666' }}>
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link to="/" style={{ fontSize: 18, textDecoration: 'none' }}>
        Go to Home Page
      </Link>
    </section>
  );
};

export default NotFoundPage;
