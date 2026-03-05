import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Sun, Moon, Settings } from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';
import { useTheme } from '@/context/ThemeContext';

export const BookmarkToggle = ({
  isMobile = false,
}: {
  isMobile?: boolean;
}) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { currency, toggleCurrency } = useCurrency();

  const { theme, toggleTheme } = useTheme();

  const langMap = {
    en: 'EN',
    uk: 'UA',
  };

  const languageToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    i18n.changeLanguage(i18n.language === 'en' ? 'uk' : 'en');
    event.stopPropagation();
  };

  return (
    <div
      className={`absolute transition-all duration-500 ease-in-out z-[-1]
        ${isMobile ? 'right-2' : 'left-1/2 -translate-x-1/2'}
        ${isOpen ? 'top-full' : '-top-[70px]'}`}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <div
        className="relative flex flex-col items-center bg-popover w-10 gap-15"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)',
        }}
      >
        <div className="flex flex-col items-center gap-1 lg:gap-6 mt-4 z-10">
          <button
            onClick={(event) => {
              event.stopPropagation();
              toggleTheme();
            }}
            className="hover:scale-110 transition cursor-pointer"
            title="theme"
          >
            {theme === 'dark' ?
              <Moon />
            : <Sun />}
          </button>
          <button
            onClick={(event) => languageToggle(event)}
            className="text-md font-bold hover:scale-110 transition cursor-pointer"
            title="language"
          >
            {langMap[i18n.language as 'en' | 'uk']}
          </button>

          <button
            className="hover:scale-110 transition cursor-pointer"
            title="currency"
            onClick={(event) => {
              event.stopPropagation();
              toggleCurrency();
            }}
          >
            {currency === 'USD' ?
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line
                  x1="12"
                  y1="2"
                  x2="12"
                  y2="22"
                />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            : <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 7c0-2.5 2.5-4 5-4s5 1.5 5 4-2.5 4-5 5-5 2.5-5 5 2.5 4 5 4 5-1.5 5-3" />
                <line
                  x1="5"
                  y1="11"
                  x2="19"
                  y2="11"
                />
                <line
                  x1="5"
                  y1="14"
                  x2="19"
                  y2="14"
                />
              </svg>
            }
          </button>
        </div>
        <button
          onClick={(event) => {
            event.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="mb-12 text-sm transition-transform duration-1700 ease-in-out cursor-pointer hover:rotate-360"
          title="settings"
        >
          <Settings />
        </button>
      </div>
    </div>
  );
};
