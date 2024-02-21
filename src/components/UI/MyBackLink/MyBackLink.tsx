import { Link, useLocation } from 'react-router-dom';
import './MyBackLink.scss';

export const MyBackLink = () => {
  const { state } = useLocation();
  const previousPath = state?.previousPath || null;
  const stepBack = previousPath || '..';

  return (
    <Link to={stepBack} className="my-back-link">Back</Link>
  );
};
