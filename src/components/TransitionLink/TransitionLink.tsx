import { Link, useLocation } from 'react-router-dom';
import { usePageTransition } from '../../providers/PageTransitionProvider';
import { shouldNavigate } from '../../utils/navigation';

type Props = {
  to: string;
  children: React.ReactNode;
  className?: string;
};

export const TransitionLink = ({ to, children, className }: Props) => {
  const { startTransition } = usePageTransition();
  const location = useLocation();

  const handleClick = (e: React.MouseEvent) => {
    if (!shouldNavigate(to, location)) {
      return;
    }

    e.preventDefault();
    startTransition(to);
  };

  return (
    <Link to={to} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
};
