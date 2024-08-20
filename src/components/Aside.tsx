import { NavItem } from './NavItem';
import { Header } from './Header';
import { useDashboard } from '../hooks/useShoppingDashboard';
import { Navigation } from '../components/Navigation';
import { forwardRef } from 'react';

export const Aside = forwardRef<HTMLElement>((_, ref) => {
  const { dashboardItems } = useDashboard();

  return (
    <aside
      className="fixed inset-0 z-10 flex flex-col
        justify-between bg-white"
      ref={ref}
    >
      <div className="flex flex-col gap-6">
        <Header className="static" />

        <Navigation className="flex items-center justify-center md:hidden" />
      </div>

      <div className="flex h-16">
        {dashboardItems.map(itemBoard => (
          <NavItem
            key={itemBoard.id}
            to={itemBoard.to}
            className="flex w-full cursor-pointer
            items-center justify-center	border-l
            border-t border-elements"
          >
            <img src={itemBoard.src} alt={itemBoard.alt} className="relative" />
            {!!itemBoard.count && (
              <small
                className="
                  absolute flex h-4 -translate-y-1/2 translate-x-1/2
                  items-center justify-center rounded-full border-[2px]
                  bg-red px-[3px] text-[9px] text-white
                "
              >
                {itemBoard.count}
              </small>
            )}
          </NavItem>
        ))}
      </div>
    </aside>
  );
});

Aside.displayName = 'Aside';
