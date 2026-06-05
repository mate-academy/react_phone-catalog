import { useTheme } from '@/app/providers/Theme';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import { Icon } from '@/components/Icon';
import classNames from 'classnames';
import { HTMLAttributes, useEffect, useRef, useState } from 'react';

export const Setting = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  const { theme, toggleTheme } = useTheme();
  const { i18n } = useTranslation();
  const [settingMenu, setSettingMenu] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = (event: PointerEvent) => {
      const target = event.target;

      if (target instanceof Node && menuRef.current && !menuRef.current.contains(target)) {
        setSettingMenu(false);
      }
    };

    if (settingMenu) {
      document.addEventListener('pointerdown', handle);
    }

    return () => {
      document.removeEventListener('pointerdown', handle);
    };
  }, [settingMenu, setSettingMenu]);

  return (
    <div ref={menuRef} {...props} className={classNames(styles.setting, className)}>
      <button
        aria-label="Open and close setting language and theme"
        onClick={() => {
          setSettingMenu(!settingMenu);
        }}
        className={classNames(styles.mainButton, { [styles.active]: settingMenu })}
      >
        <Icon
          className={classNames(styles.mainButtonIcon, {
            [styles.mainButtonIconActive]: settingMenu,
          })}
          type="setting"
        ></Icon>
      </button>

      <div
        className={classNames(styles.settingContainer, {
          [styles.settingContainerActive]: settingMenu,
        })}
      >
        <button
          aria-label="Toggle theme"
          className={styles.settingButton}
          onClick={() => toggleTheme()}
        >
          {theme === 'light' && <Icon type="sun"></Icon>}
          {theme === 'dark' && <Icon type="moon"></Icon>}

          <div
            className={classNames(styles.settingSwicher, {
              [styles.dark]: theme === 'dark',
            })}
          ></div>
        </button>
        <button
          aria-label="Toggle language"
          className={styles.settingButton}
          onClick={() => i18n.changeLanguage(i18n.language === 'uk' ? 'en' : 'uk')}
        >
          {i18n.language === 'uk' && <p className={styles.languageText}>UK</p>}
          {i18n.language === 'en' && <p className={styles.languageText}>EN</p>}

          <div
            className={classNames(styles.settingSwicher, {
              [styles.dark]: i18n.language === 'uk',
            })}
          ></div>
        </button>
      </div>
    </div>
  );
};
