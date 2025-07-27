import clsx from 'clsx';
import * as Switch from '@radix-ui/react-switch';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (checked: boolean) => {
    // checked буде true, якщо світчер переключено в позицію "UA"
    const newLanguage = checked ? 'uk' : 'en';
    i18n.changeLanguage(newLanguage);
  };

  const currentLanguage = i18n.language; // Отримуємо поточну мову з i18n

  return (
    <div className="flex items-center gap-2 p-2">
      <span
        className={clsx(
          'text-sm font-bold select-none',
          currentLanguage === 'en'
            ? 'text-primary dark:text-purple'
            : 'text-secondary dark:text-dark-secondary',
        )}
      >
        EN
      </span>

      <Switch.Root
        checked={currentLanguage === 'uk'}
        onCheckedChange={handleLanguageChange}
        className={clsx(
          'w-12 h-6 rounded-full relative transition-colors duration-200 cursor-pointer outline-none border-2',
          'bg-elements dark:bg-dark-elements border-elements dark:border-dark-elements',
          'hover:bg-secondary dark:hover:bg-dark-button-purple-hover',
        )}
      >
        <Switch.Thumb
          className={clsx(
            'block w-5 h-5 rounded-full shadow-md transition-transform duration-200',
            currentLanguage === 'uk'
              ? 'bg-white translate-x-6'
              : 'bg-white translate-x-0',
          )}
        />
      </Switch.Root>

      <span
        className={clsx(
          'text-sm font-bold select-none',
          currentLanguage === 'uk'
            ? 'text-primary dark:text-purple'
            : 'text-secondary dark:text-dark-secondary',
        )}
      >
        UA
      </span>
    </div>
  );
};
