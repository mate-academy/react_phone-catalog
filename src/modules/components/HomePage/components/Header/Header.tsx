import './Header.scss';
import '../../../../shared/styles/_header.scss';
import { Slider } from '../../../../shared/components/Slider';
import { images } from '../../../../../global-assets/static';
import { useContext } from 'react';
import { TranslationContext } from '../../../../../i18next/shared';
import { Switcher } from '../../../../shared/components/Switcher';
import { ScreenState } from '../../../../shared/reduce/LangThemeReducer';

export const Header: React.FC = () => {
  const text = useContext(TranslationContext).homePage;
  const { isDesktop, isMobile } = useContext(ScreenState);

  return (
    <header className="header header__main">
      <div className="header__content">
        {!isMobile && !isDesktop && <Switcher />}
        <h1
          className="header__content-title"
          style={{ whiteSpace: 'pre-line' }}
        >
          {text.title}
        </h1>
        <Slider content={images} />
      </div>
    </header>
  );
};
