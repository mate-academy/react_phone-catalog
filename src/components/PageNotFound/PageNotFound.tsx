import { useNavigate } from 'react-router';
import './PageNotFound.scss';

export const PageNotFound = () => {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate('/');
  }, 2000);

  return (
    <div className="page-not-found">
      <h1 className="page-not-found__title">Page not found</h1>
    </div>
  );
};
