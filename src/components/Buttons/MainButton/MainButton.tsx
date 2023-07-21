import React from 'react';
import { Link } from 'react-router-dom';

import '../Button.scss';

type Props = {
  text: string,
  where: string,
  className: string,
};

export const MainButton: React.FC<Props> = ({
  text,
  where,
  className,
}) => (
  <Link
    to={where}
    className={`button button--main ${className}`}
  >
    <p className="button--main__text">
      {text}
    </p>
  </Link>
);
