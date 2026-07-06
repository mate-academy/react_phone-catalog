//#region imports
import cn from 'classnames';
import { useState } from 'react';
import { useOutsideClick } from '../../modules/shared/hooks/useOutsideClick';
import { useTranslation } from 'react-i18next';
import { Language, languages } from '../../modules/shared/constants/languages';
import styles from './LanguageSelector.module.scss';
import { useCloseOnEscape } from '../../modules/shared/hooks/useCloseOnEscape';
//#endregion

export const LanguageSelector = () => {
  //#region translation
  const { i18n } = useTranslation();
  const selectedLanguage =
    languages.find(lang => lang.code === i18n.language) || languages[0];
  const changeLanguage = (newLang: Language) => {
    i18n.changeLanguage(newLang.code);
  };
  //#endregion

  //#region hooks
  const [isOpen, setIsOpen] = useState(false);
  const ref = useOutsideClick(() => {
    setIsOpen(false);
  });

  useCloseOnEscape(() => setIsOpen(false));
  //#endregion

  return (
    <div className={styles.selector} ref={ref}>
      <button
        className={cn(styles.selected, {
          [styles.withOptions]: isOpen,
        })}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={selectedLanguage.name}
      >
        <img
          src={selectedLanguage.flag}
          alt={`${selectedLanguage.name} flag`}
          className={styles.flag}
        />

        {selectedLanguage.locale}
      </button>

      <ul
        className={cn(styles.options, {
          [styles.showed]: isOpen,
        })}
      >
        {languages.map(lang => (
          <li key={lang.name}>
            <button
              className={cn(styles.option, {
                [styles.selectedOption]: lang.code === selectedLanguage.code,
              })}
              onClick={() => {
                changeLanguage(lang);
                setIsOpen(false);
              }}
            >
              <img
                src={lang.flag}
                alt={`${lang.name} flag`}
                className={styles.flag}
              />

              {lang.locale}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
