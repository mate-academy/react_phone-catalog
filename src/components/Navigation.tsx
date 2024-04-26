import { twMerge } from 'tailwind-merge';
import { NavItem } from './NavItem';
import { useDashboard } from '../hooks/useShoppingDashboard';

interface Props {
  className?: string;
}

export const Navigation: React.FC<Props> = ({ className = '' }) => {
  const { dashboardNavigation } = useDashboard();

  return (
    <nav className={twMerge('hidden md:flex', className)}>
      <ul
        className="
          flex h-full flex-col gap-4 md:flex-row md:gap-8 lg:gap-16
        "
      >
        {dashboardNavigation.map(itemNav => (
          <li className="flex h-7 justify-center md:h-full" key={itemNav.id}>
            <NavItem to={itemNav.link}>{itemNav.title}</NavItem>
          </li>
        ))}
      </ul>
    </nav>
  );
};
