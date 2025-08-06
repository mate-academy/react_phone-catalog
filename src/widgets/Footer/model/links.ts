import {
  NavAriaLabels,
  NavElementName,
  NavLinkProps,
  RoutePath,
} from '@shared/types';

export const linksList: NavLinkProps[] = [
  {
    title: NavElementName.Github,
    path: RoutePath.Github,
    ariaLabel: NavAriaLabels.Github,
  },
  {
    title: NavElementName.Contacts,
    path: RoutePath.Contacts,
    ariaLabel: NavAriaLabels.Contacts,
  },
  {
    title: NavElementName.Rights,
    path: RoutePath.Rights,
    ariaLabel: NavAriaLabels.Rights,
  },
];
