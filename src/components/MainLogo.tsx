import { NavLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export const MainLogo: React.FC<Props> = ({ className = '', children }) => {
  return (
    <NavLink to="/" className={twMerge('mx-4 flex items-center', className)}>
      {children}
    </NavLink>
  );
};
