export const navItems = [
  { name: 'Home', link: '/' },
  { name: 'Phones', link: '/phones', type: 'phone' },
  { name: 'Tablets', link: '/tablets', type: 'tablet' },
  { name: 'Accessories', link: '/accessories', type: 'accessory' },
];

export const findNavItem = (type: string) => {
  return navItems.find(navItem => navItem.type === type);
};
