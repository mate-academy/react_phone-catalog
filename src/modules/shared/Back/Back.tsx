import { Link } from 'react-router-dom';
import './Back.scss';

export const Back = () => {
  return (
    <Link to=".." relative="path" className="back">
      Back
    </Link>
  );
};
