import React, { memo } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import './SquareLink.scss';

interface Props extends LinkProps {
  iconName: string;
  iconFormat?: string,
}

export const SquareLink: React.FC<Props> = memo(({
  iconName,
  iconFormat = 'svg',
  className = '',
  ...restProps
}) => {
  const classes = `square-link ${className}`;

  return (
    <Link className={classes} {...restProps}>
      <img src={`./img/icons/${iconName}.${iconFormat}`} alt="Icon" />
    </Link>
  );
});
