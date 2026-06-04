import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Player } from '@lordicon/react';

import rawStyles from './LanguageSelector.module.scss';
const styles = rawStyles as { [key: string]: string };

import globeIcon from '../../img/globeRotate.json';

import { LANGUAGES } from './languageConfig';
import { LanguageCard } from './LanguageCard';
import { useDropdown } from '../../hooks/useDropdown';
import { useLordicon } from '../../hooks/useLordicon';

export const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const { isOpen, toggle, close, containerRef } = useDropdown();
  const { playerRef, handleMouseEnter } = useLordicon();

  const changeLang = (lng: 'uk' | 'en') => {
    void i18n.changeLanguage(lng);
  };

  const currentConfig = useMemo(() => {
    return LANGUAGES.find(l => l.id === i18n.language) || LANGUAGES[0];
  }, [i18n.language]);

  useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, [i18n.language, playerRef]);

  return (
    <div className={styles.switcher} ref={containerRef}>
      <button
        className={styles.toggleButton}
        onMouseEnter={handleMouseEnter}
        type="button"
        onClick={toggle}
      >
        <Player
          className={styles.globeIcon}
          ref={playerRef}
          icon={globeIcon}
          colors={`primary:${currentConfig.textColor},secondary:${currentConfig.accentColor}`}
        />
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownContent}>
            {LANGUAGES.map(lang => (
              <LanguageCard
                key={lang.id}
                language={lang}
                isActive={i18n.language === lang.id}
                onClick={() => {
                  changeLang(lang.id as 'uk' | 'en');
                  close();
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
