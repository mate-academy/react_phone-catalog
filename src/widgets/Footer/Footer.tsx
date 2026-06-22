'use client';

import Link from 'next/link';

import { TranslationKey } from '@/shared/constants/translations';
import { useTranslation } from '@/shared/hooks';
import { Logo } from '@/shared/ui/Logo';
import { UppercaseText } from '@/shared/ui/Typography';

import { BackToTop } from './BackToTop';

type FooterNavLink = {
  href: string;
  labelKey: TranslationKey;
};

const navLinks: FooterNavLink[] = [
  {
    href: 'https://github.com/Nice-Gadgets/nice-gadgets-frontend-nextjs',
    labelKey: 'github',
  },
  {
    href: 'https://github.com/Nice-Gadgets',
    labelKey: 'contacts',
  },
  {
    href: 'https://github.com/Nice-Gadgets/nice-gadgets-frontend-nextjs/blob/main/LICENSE',
    labelKey: 'rights',
  },
];

const NavLinks = () => {
  const { t } = useTranslation();

  return (
    <>
      {navLinks.map(({ href, labelKey }) => (
        <Link
          key={labelKey}
          href={href}
          target="_blank"
          className="text-brand-secondary transition-transform duration-300 hover:scale-110 hover:text-brand-white"
        >
          <UppercaseText>{t(labelKey)}</UppercaseText>
        </Link>
      ))}
    </>
  );
};

export const Footer = () => {
  return (
    <>
      <footer className="border-t border-brand-elements px-6 py-5">
        <div className="relative hidden items-center md:flex">
          <Logo />

          <nav className="absolute left-1/2 flex -translate-x-1/2 items-center gap-10">
            <NavLinks />
          </nav>
        </div>

        <div className="flex flex-col gap-6 md:hidden">
          <Logo />

          <nav className="flex flex-col gap-3">
            <NavLinks />
          </nav>
        </div>
      </footer>

      <div className="fixed right-6 bottom-6 z-100">
        <BackToTop />
      </div>
    </>
  );
};
