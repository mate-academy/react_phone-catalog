export interface NavigationLink {
  to: string;
  labelKey: string;
  label: string;
  external?: boolean; // For external links like GitHub
}

// Main navigation (Header, Burger Menu)
export const navigationLinks: NavigationLink[] = [
  {
    to: '/',
    labelKey: 'nav.home',
    label: 'HOME',
  },
  {
    to: '/phones',
    labelKey: 'nav.phones',
    label: 'PHONES',
  },
  {
    to: '/tablets',
    labelKey: 'nav.tablets',
    label: 'TABLETS',
  },
  {
    to: '/accessories',
    labelKey: 'nav.accessories',
    label: 'ACCESSORIES',
  },
];

// Footer navigation
export const footerLinks: NavigationLink[] = [
  {
    to: 'https://github.com/your-username/your-repo', // Replace with your GitHub URL
    labelKey: 'footer.github',
    label: 'GITHUB',
    external: true, // External link
  },
  {
    to: '/contacts',
    labelKey: 'footer.contacts',
    label: 'CONTACTS',
  },
  {
    to: '/rights',
    labelKey: 'footer.rights',
    label: 'RIGHTS',
  },
];
