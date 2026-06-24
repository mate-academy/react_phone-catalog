import { NavLink } from 'react-router-dom';
import cn from 'clsx';
import Logo from '/src/images/logo.svg?react';
import type { FC } from 'react';
import { FOOTER_NAVIGATION as NAVIGATION } from '../constants/footer_navigation';
import { ThemeToggle } from '../../../components/ui/Toggle/ThemeToggle';
import { LanguageToggle } from '../../../components/ui/Toggle/LanguageToggle';
import { BackToTopButton } from '../../../components/ui/Button/BackToTopButton';
import { useTranslations } from 'use-intl';

type Props = {
  className?: string;
};

export const Footer: FC<Props> = ({ className }) => {
  const t = useTranslations('nav');

  return (
    <footer
      className={cn(
        'shadow-top shadow-elements dark:shadow-d-surface2 py-8',
        className,
      )}
    >
      <div className="container">
        <div className="flex flex-col justify-center gap-8 lg:flex-row lg:items-center lg:gap-0">
          <div className="flex justify-start sm:flex-[1_1_auto]">
            <div className="flex flex-col justify-start gap-8 lg:gap-10">
              <NavLink to="/" className="flex">
                <Logo className="fill-primary dark:fill-d-white h-8" />
              </NavLink>
            </div>
          </div>

          <nav className="sm:flex-[1_1_auto]">
            <ul className="flex h-full flex-col items-start gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-0">
              {NAVIGATION.map(({ title, href }) => (
                <li key={title} className="flex self-stretch">
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-uppercase text-secondary dark:text-d-secondary hover:text-primary dark:hover:text-d-white transition"
                  >
                    {title === 'GitHub' ||
                    title === 'Contacts' ||
                    title === 'Rights'
                      ? t(title.toLowerCase())
                      : title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-[1_1_auto] items-center justify-center lg:justify-end">
            <BackToTopButton />
          </div>
        </div>

        <div className="mt-6 flex flex-col items-start gap-4 lg:flex-row">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
};
