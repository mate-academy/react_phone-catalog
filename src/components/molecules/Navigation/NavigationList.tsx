import { NavigationLink } from '../../atoms/NavigationLink/NavigationLink';

export const NavigationList = () => {
  const navItems = [
    { href: 'https://github.com/FiveEnds/Frontend', label: 'Github' },
    { href: '/contacts', label: 'Contacts' },
    {
      href: 'https://doc.clickup.com/24383048/p/h/q83j8-1330655/fe2b3402be1f9d1/q83j8-1559315',
      label: 'Rights',
    },
  ];
  return (
    <nav className="flex flex-col md:flex-row items-start md:items-center gap-[16px] md:gap-[13.5px] lg:gap-[106px] ">
      {navItems.map((item) => (
        <NavigationLink
          key={item.label}
          classNames="hover-zoom-small dark:hover:text-accent-dark text-secondary dark:text-white group-hover:text-primary"
          href={item.href}
        >
          {item.label}
        </NavigationLink>
      ))}
    </nav>
  );
};
