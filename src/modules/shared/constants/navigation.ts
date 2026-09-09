export type NavItem = {
  to: string;
  text: string;
  end?: boolean;
};

export const navItems: NavItem[] = [
  { to: '/', text: 'Home', end: true },
  { to: '/phones', text: 'Phones' },
  { to: '/tablets', text: 'Tablets' },
  { to: '/accessories', text: 'Accessories' },
];

export const footerItems: NavItem[] = [
  {
    to: 'https://github.com/denis-denis718/react_phone-catalog',
    text: 'Github',
  },
  { to: 'https://github.com/denis-denis718', text: 'Contacts' },
  {
    to: 'https://github.com/denis-denis718/react_phone-catalog#readme',
    text: 'Rights',
  },
];
