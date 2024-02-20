import { Link } from 'react-router-dom';
import './MyBackLink.scss';

export const MyBackLink = () => {
  return (
    <Link to=".." className="my-back-link">Back</Link>
  );
};
