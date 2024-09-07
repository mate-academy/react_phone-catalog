import { Link } from 'react-router-dom';

type Props = {
  className?: string;
};

export const Logo: React.FC<Props> = ({ className = '' }) => (
  <Link className={`logo ${className}`.trim()} to="/">
    <span className="sr-only">Go to home page</span>
    <img className="logo__img" src="img/logo.svg" alt="NICE GADGETS logo" />
  </Link>
);
