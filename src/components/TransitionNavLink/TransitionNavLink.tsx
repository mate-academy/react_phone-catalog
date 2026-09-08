import { NavLink, NavLinkProps, useLocation } from 'react-router-dom';
import { usePageTransition } from '../../providers/PageTransitionProvider';
import { getPathFromTo, shouldNavigate } from '../../utils/navigation';

export const TransitionNavLink: React.FC<NavLinkProps> = ({
  to,
  children,
  ...rest
}) => {
  const { startTransition } = usePageTransition();
  const location = useLocation();

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    if (!shouldNavigate(to, location)) {
      return;
    }

    event.preventDefault();
    const path = getPathFromTo(to);

    startTransition(path);
  };

  return (
    <NavLink {...rest} to={to} onClick={handleClick}>
      {children}
    </NavLink>
  );
};
