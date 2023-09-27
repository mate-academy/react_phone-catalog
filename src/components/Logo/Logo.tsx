import { Link } from 'react-router-dom';
import './logo.scss';

export const Logo: React.FC = () => {
  return (
    <Link to="/" className="logo" />
  );
};
