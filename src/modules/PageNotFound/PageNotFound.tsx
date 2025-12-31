import { Link } from 'react-router-dom';
import { Title } from '../../components/Title';

export const PageNotFound = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 20px',
        gap: '24px',
      }}
    >
      <Title text="Page not found" level={1} />

      <p>We are sorry, but the page you requested could not be found.</p>

      <Link
        to="/"
        style={{
          padding: '12px 24px',
          backgroundColor: '#313237',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '8px',
        }}
      >
        Go to Home Page
      </Link>
    </div>
  );
};
