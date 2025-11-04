import './Header.scss';
import '../../../../shared/styles/_header.scss';
import { Slider } from '../../../../shared/components/Slider';
import { images } from '../../../../../global-assets/static';
import { useContext } from 'react';
import { TranslationContext } from '../../../../../i18next/shared';

export const Header: React.FC = () => {
  const text = useContext(TranslationContext).homePage;

  return (
    <header className="header header__main">
      <div className="header__content">
        <h1 className="header__content-title">{text.title}</h1>
        <Slider content={images} />
      </div>
    </header>
  );
};
