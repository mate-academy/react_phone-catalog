import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import cn from 'classnames';

import { useOutsideClick } from '@hooks/useOutsideClick ';

import { initialFlag } from '@utils/constants/initialFlag';
import { languages } from '@utils/constants/languages';

import styles from './LanguagesSelector.module.scss';
import { LanguageButton } from './language-button/LanguageButton';
import { LanguageIcon } from './language-icon/LanguageIcon';

export const LanguagesSelector: FC = () => {
  const { i18n } = useTranslation();

  const selectFlag = initialFlag(languages, i18n.language);

  const [selectedFlag, setSelectedFlag] = useState(selectFlag);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ref = useOutsideClick(() => setIsMenuOpen(false));

  const handleLanguageChange = (languageCode: string, flagIcon: string) => {
    i18n.changeLanguage(languageCode);
    setSelectedFlag(flagIcon);
    setIsMenuOpen(false);
  };

  const handleTouchStart = () => {
    setIsMenuOpen(true);
  };

  return (
    <div className={styles.menu} ref={ref}>
      <ul className={styles.list}>
        <li onTouchStart={handleTouchStart}>
          <LanguageIcon flag={selectedFlag} />
          <ul className={cn(styles.subMenu, { [styles.open]: isMenuOpen })}>
            {languages.map(language => (
              <li key={language.code}>
                <LanguageButton
                  language={language}
                  currentLanguage={i18n.language}
                  onChangeLanguage={handleLanguageChange}
                />
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
};
