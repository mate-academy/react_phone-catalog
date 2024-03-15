import cn from 'classnames';
import { Link } from 'react-router-dom';

import './Logo.scss';

type Props = {
  classNames?: string;
};

export const Logo: React.FC<Props> = ({
  classNames,
}) => {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Link
      className={cn('logo', classNames)}
      to="/"
      onClick={handleClick}
    >
      <img
        src="img/Logo.png"
        alt="Logo"
        className="logo__image"
      />
    </Link>
  );
};
