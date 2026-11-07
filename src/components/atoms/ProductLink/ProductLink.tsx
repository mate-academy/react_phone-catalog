import type React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  to: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
};

export const ProductLink: React.FC<Props> = ({
  to,
  children,
  className,
  ariaLabel,
}) => (
  <Link
    to={to}
    aria-label={ariaLabel}
    className={className}
  >
    {children}
  </Link>
);
