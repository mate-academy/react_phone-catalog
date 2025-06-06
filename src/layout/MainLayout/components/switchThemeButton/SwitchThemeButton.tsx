import React, { useRef } from 'react';

import styles from './SwitchThemeButton.module.scss';
import { AppButton } from '../../../../modules/shared/components/appButton';
import { switchTheme } from '../../../../features/themeSlice/theme';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { SunSvg } from '../../../../modules/shared/svg/SunSvg';
import { MoonSvg } from '../../../../modules/shared/svg/MoonSvg';

const classForAnimationThemeButton = {
  enter: styles.enterThemeButton,
  enterActive: styles.enterActiveThemeButton,
  exit: styles.exitThemeButton,
  exitActive: styles.exitActiveThemeButton,
};

export const SwitchThemeButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(s => s.theme);

  const sunRef = useRef(null);
  const moonRef = useRef(null);

  return (
    <AppButton
      buttonName="switch theme"
      className={styles.themeButton}
      onClick={() => dispatch(switchTheme())}
    >
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={theme}
          timeout={300}
          nodeRef={theme === 'light' ? sunRef : moonRef}
          classNames={classForAnimationThemeButton}
        >
          {theme === 'light' ? (
            <div ref={sunRef} className={styles.themeButtonContainer}>
              <SunSvg color="#ff6539" />
            </div>
          ) : (
            <div ref={moonRef} className={styles.themeButtonContainer}>
              <MoonSvg color="#a0a0e0" />
            </div>
          )}
        </CSSTransition>
      </SwitchTransition>
    </AppButton>
  );
};
