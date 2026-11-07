import { NavigationLink } from '../../atoms/NavigationLink/NavigationLink';

type NavigationListProps = {
  direction?: 'row' | 'column';
  handleClickLink?: () => void;
};

export const NavigationTopList: React.FC<NavigationListProps> = ({
  direction = 'row',
  handleClickLink,
}) => {
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/phones', label: 'Phones' },
    { href: '/tablets', label: 'Tablets' },
    { href: '/accessories', label: 'Accessories' },
  ];

  const isColumn = direction === 'column';

  return (
    <nav
      className={`flex ${isColumn ? 'flex-col items-center gap-[16px]' : 'items-center gap-5  em:gap-[32px] lg:gap-[64px]'}`}
    >
      {navItems.map((item) => {
        return (
          <div
            key={item.href}
            className={`hover-zoom-small relative flex items-center ${isColumn ? 'h-[27px]' : 'h-[48px] lg:h-[64px]'}`}
          >
            <NavigationLink
              href={item.href}
              handleClickLink={handleClickLink}
            >
              {item.label}
            </NavigationLink>
          </div>
        );
      })}
    </nav>
  );
};
