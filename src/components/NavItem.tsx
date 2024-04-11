import { NavLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

interface Props {
  to: string;
  className?: string;
  children: React.ReactNode;
}

export const NavItem: React.FC<Props> = ({ className, children, to }) => {
  return (
    <NavLink
      className={({ isActive }: { isActive: boolean }) =>
        twMerge(
          `h-fill before:botton-0 relative flex items-center uppercase text-secondary
          duration-500 before:absolute before:bottom-0 before:h-0.75 before:w-0
          before:bg-primary before:transition-all before:content-[''] md:hover:text-primary
          md:hover:before:w-full`,
          isActive && `text-primary before:w-full`,
          className,
        )
      }
      to={to}
    >
      {children}
    </NavLink>
  );
};
