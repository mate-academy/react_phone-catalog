import './TopBar.scss';
import { logoLightMode, logoDarkMode } from '../../../global-assets/static';
import type { IconList } from '../../shared/types/IconList';
import { useContext } from 'react';
import { ProductListContext } from '../../shared/context/ProductListContext';
import { UISettingsState } from '../../shared/reduce/LangThemeReducer';
import { Switcher } from '../../shared/components/Switcher';

type TopBarProps = {
  buttonData: IconList['menu'] | IconList['close'];
};

export const TopBar: React.FC<TopBarProps> = ({ buttonData }) => {
  const { setIsAside } = useContext(ProductListContext);
  const IconSvg = buttonData.valuePath;

  const settingsState = useContext(UISettingsState);

  const handleClose = () => {
    setIsAside(false);
  };

  return (
    <div className="top-bar">
      <div className="top-bar__logo">
        {settingsState.theme === 'light' ? (
          <img src={logoLightMode} alt="Compamy logo" />
        ) : (
          <img src={logoDarkMode} alt="Compamy logo" />
        )}
      </div>
      {/* <section className="global-settings">
        <div className="global-settings__container">
          <button
            className={classNames('global-settings__btn', {
              'global-settings__btn--active': settingsState.theme === 'light',
            })}
            onClick={() => handleSwitchTheme('light')}
          >
            <ThemeLightIcon />
          </button>
          <button
            className={classNames('global-settings__btn', {
              'global-settings__btn--active': settingsState.theme === 'dark',
            })}
            onClick={() => handleSwitchTheme('dark')}
          >
            <ThemeDarkIcon />
          </button>
        </div>
        <div className="global-settings__container">
          <button
            className={classNames('global-settings__btn', {
              'global-settings__btn--active': settingsState.lang === 'en',
            })}
            onClick={() => handleSwitchLang('en')}
          >
            en
          </button>
          <button
            className={classNames('global-settings__btn', {
              'global-settings__btn--active': settingsState.lang === 'ua',
            })}
            onClick={() => handleSwitchLang('ua')}
          >
            ua
          </button>
        </div>
      </section> */}
      <Switcher />
      <div className="top-bar__nav">
        {buttonData.valueName === 'menu' ? (
          <button className="top-bar__button" onClick={() => setIsAside(true)}>
            <IconSvg className="top-bar__button--icon" />
          </button>
        ) : (
          <button onClick={handleClose} className="top-bar__button">
            <IconSvg className="top-bar__button--icon" />
          </button>
        )}
      </div>
    </div>
  );
};
