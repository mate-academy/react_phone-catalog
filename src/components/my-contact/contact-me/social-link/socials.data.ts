import { Icons } from '@ui/index';

export type TSocials = {
  href: string;
  className: string;
  svg: () => JSX.Element;
};

export const socialsLinks: TSocials[] = [
  {
    href: 'https://www.linkedin.com/in/andriy-halosa-b0900a302/',
    className: 'linkedin',
    svg: Icons.LinkedinIcon,
  },
  {
    href: 'https://t.me/Galerss',
    className: 'telegram',
    svg: Icons.TelegramIcon,
  },
  {
    href: 'https://x.com/1Galers',
    className: 'twitter',
    svg: Icons.TwitterIcon,
  },
  {
    href: 'https://www.facebook.com/profile.php?id=61553691657560',
    className: 'facebook',
    svg: Icons.FacebookIcon,
  },
];
