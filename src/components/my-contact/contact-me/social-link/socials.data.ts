import { LinkedinIcon } from '@ui/icon/Linkedin';
import { TelegramIcon } from '@ui/icon/TelegramIcon';
import { TwitterIcon } from '@ui/icon/TwitterIcon';
import { FacebookIcon } from '@ui/icon/FacebookIcon';

export type TSocials = {
  href: string;
  className: string;
  svg: () => JSX.Element;
};

export const socialsLinks: TSocials[] = [
  {
    href: 'https://www.linkedin.com/in/andriy-halosa-b0900a302/',
    className: 'linkedin',
    svg: LinkedinIcon,
  },
  {
    href: 'https://t.me/Galerss',
    className: 'telegram',
    svg: TelegramIcon,
  },
  {
    href: 'https://x.com/1Galers',
    className: 'twitter',
    svg: TwitterIcon,
  },
  {
    href: 'https://www.facebook.com/profile.php?id=61553691657560',
    className: 'facebook',
    svg: FacebookIcon,
  },
];
