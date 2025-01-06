import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './Logo.scss';

type Props = {
  className?: string;
};

export const Logo: React.FC<Props> = ({ className }) => (
  <Link className={classNames(className, 'logo')} to={'/'}>
    <img className="logo__image" src="img/logo.svg" alt="Logo" />
  </Link>
);
