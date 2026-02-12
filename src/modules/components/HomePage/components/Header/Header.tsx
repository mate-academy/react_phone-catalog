import './Header.scss';
import '../../../../shared/styles/_header.scss';
import { HomeSlider } from '../HomeSlider';
import { images } from '../../../../../global-assets/static';
import { useContext } from 'react';
import { TranslationContext } from '../../../../../i18next/shared/TranslationContext';
import { ThemeLanguageSwitcher } from '../../../../shared/components/ui/ThemeLanguageSwitcher';
import { ScreenState } from '../../../../shared/reducer/LangThemeReducer';

export const Header: React.FC = () => {
  const text = useContext(TranslationContext).homePage;
  const { isDesktop, isMobile } = useContext(ScreenState);

  return (
    <header className="header header__main">
      <div className="header__content">
        {!isMobile && !isDesktop && <ThemeLanguageSwitcher />}
        <h1
          className="header__content-title"
          style={{ whiteSpace: 'pre-line' }}
        >
          {text.title}
        </h1>
        <HomeSlider content={images} />
      </div>
    </header>
  );
};
