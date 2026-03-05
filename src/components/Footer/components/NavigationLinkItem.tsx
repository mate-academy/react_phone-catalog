import { Link } from 'react-router-dom';
import type { NavigationLink } from '../types/footerTypes';

interface NavigationLinkItemProps {
  link: NavigationLink;
  label: string;
  className?: string;
}

export const NavigationLinkItem = ({
  link,
  label,
  className,
}: NavigationLinkItemProps) => {
  if (link.isExternal) {
    return (
      <a
        href={link.to}
        target="_blank"
        rel="noreferrer"
        className={className}
      >
        {label}
      </a>
    );
  }

  return (
    <Link
      to={link.to}
      className={className}
    >
      {label}
    </Link>
  );
};
