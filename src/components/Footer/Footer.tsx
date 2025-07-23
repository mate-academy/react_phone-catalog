import { NavLink } from 'react-router-dom';
import { Logo } from '../../images/logos/Logo';
import { BackToTopButton } from '../BackToTopButton';
import { useLanguage } from '../../context/language/useLanguage';
import { footerDictionaty } from '../../i18n/footerDictionary';

export const Footer = () => {
  const { currentLanguage } = useLanguage(); // Використовуємо хук для доступу до мови та її зміни

  // const handleLanguageChange = (lang: 'ua' | 'en') => {
  //     setLanguage(lang);
  // };

  return (
    <footer className="border-t border-elements dark:border-dark-elements border-[1.5px] py-8 min-w-[288px] sm:min-w-[192px]">
      <div
        className="
          max-w-[1440px] mx-auto
          flex flex-col gap-8 items-start
          sm:flex-row sm:items-center sm:justify-between
          px-4 sm:px-8
        "
      >
        <NavLink
          to="/"
          className="flex-shrink-0 w-24 md:w-28 h-12 md:h-14"
        >
          <Logo />
        </NavLink>

        <nav className="w-full sm:w-auto">
          <ul
            className="
            flex flex-col gap-2 
            sm:flex-row sm:gap-12
            font-semibold text-secondary dark:text-dark-secondary
            uppercase tracking-wide
            items-start sm:items-center
          "
          >
            <li>
              <a
                href="https://github.com/fs-apr25-girlpower/nice-gadgets-frontend"
                className="hover:text-primary dark:hover:text-purple"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
            </li>
            <li>
              <NavLink
                to="contacts"
                className="hover:text-primary dark:hover:text-purple"
              >
                {/* Contacts */}
                {footerDictionaty[currentLanguage].contacts}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="rights"
                className="hover:text-primary dark:hover:text-purple"
              >
                {/* Rights */}
                {footerDictionaty[currentLanguage].rights}
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-end">
          <span className="text-secondary dark:text-dark-secondary text-base">
            {/* Back to top */}
            {footerDictionaty[currentLanguage].backToTop}
          </span>
          <BackToTopButton />
        </div>
      </div>
    </footer>
  );
};
