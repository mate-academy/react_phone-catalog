import React, { useMemo } from 'react';
import { Player } from '@lordicon/react';

import rawStyles from './ThemeSelector.module.scss';
const styles = rawStyles as { [key: string]: string };

import paletteFlower from '../../img/paletteFlower.json';

import { useTheme } from '../../context/ThemeContext';
import { ThemeCard } from './ThemeCard';
import { THEMES } from './themeConfig';
import { useDropdown } from '../../hooks/useDropdown';
import { useLordicon } from '../../hooks/useLordicon';

export const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { isOpen, toggle, close, containerRef } = useDropdown();
  const { playerRef, handleMouseEnter } = useLordicon();

  const currentConfig = useMemo(() => {
    return THEMES.find(t => t.id === theme) || THEMES[0];
  }, [theme]);

  return (
    <div className={styles.switcher} ref={containerRef}>
      <button
        onMouseEnter={handleMouseEnter}
        className={styles.toggleButton}
        onClick={toggle}
        aria-label="Select theme"
      >
        <Player
          icon={paletteFlower}
          ref={playerRef}
          colors={`primary:${currentConfig.iconAccent},secondary:${currentConfig.buttonColor}`}
        />
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownContent}>
            {THEMES.map(themeConfig => (
              <ThemeCard
                key={themeConfig.id}
                theme={themeConfig}
                isActive={theme === themeConfig.id}
                onClick={() => {
                  setTheme(themeConfig.id);
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
