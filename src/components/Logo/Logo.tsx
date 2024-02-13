import cn from 'classnames';
import { Link } from 'react-router-dom';

import './Logo.scss';

type Props = {
  classNames?: string;
};

export const Logo: React.FC<Props> = ({
  classNames,
}) => {
  return (
    <Link
      className={cn('logo', classNames)}
      to="/"
    >
      <img src="img/Logo.svg" alt="Logo" />
    </Link>
  );
};
