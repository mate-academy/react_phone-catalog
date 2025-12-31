import { Link } from 'react-router-dom';
import { Title } from '../../components/Title';

export const PageNotFound = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '60px 20px',
        textAlign: 'center',
      }}
    >
      <Title text="Page not found" />
      <Link
        to="/"
        style={{
          marginTop: '24px',
          padding: '10px 20px',
          backgroundColor: '#313237',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '4px',
        }}
      >
        Back to Home
      </Link>
    </div>
  );
};
