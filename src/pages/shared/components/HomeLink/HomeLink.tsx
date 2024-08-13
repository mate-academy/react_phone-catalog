import { Link } from 'react-router-dom';
import './HomeLink.scss';

export const HomeLink: React.FC<{ className: string }> = ({ className }) => {
  return (
    <Link to="/" className={`${className} home-link-default`}>
      <img src="./icons/home.svg" alt="home icon" />
    </Link>
  );
};
