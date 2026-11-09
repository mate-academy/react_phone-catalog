export interface NavItem {
  label: string;
  path: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'home', path: '/' },
  { label: 'phones', path: '/phones' },
  { label: 'tablets', path: '/tablets' },
  { label: 'accessories', path: '/accessories' },
];
