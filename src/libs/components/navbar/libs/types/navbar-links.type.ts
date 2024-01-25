import { AppRoutes, IconNames, ExternalLinks } from '../../../../enums';

export type NavbarLinkType = {
  title: string;
  url: AppRoutes | ExternalLinks;
  IconNames?: IconNames,
};
