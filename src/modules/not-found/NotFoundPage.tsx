// src/modules/not-found/NotFoundPage.tsx - 404 page component
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => (
  <div style={{ padding: '48px 0' }}>
    <h1>Page not found</h1>
    <p>
      <Link to="/">Go Home</Link>
    </p>
  </div>
);
