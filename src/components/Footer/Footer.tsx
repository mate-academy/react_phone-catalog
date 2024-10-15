import {
  ContainerStyled,
  FooterStyled,
  GoTopStyled,
  InfoBlockStyled,
  LogoImgStyled,
  SelectorsStyled,
} from './styled';
import logo from '../../icons/Logo.png';
import logo2 from '../../icons/Logo2.png';
import logo3 from '../../icons/Logo3.png';
import logo45 from '../../icons/Logo45.png';
import { Button } from '../Button/Button';
import { VECTOR_SVG } from '../../utils/SVG';
import { SelectInput } from '../Inputs/SelectInput/SelectInput';
import { useEffect, useState } from 'react';
import { themeMap, useTheme } from '../Themes/ThemeProvider';
import i18n from 'i18next';
import { StrCode } from '../../utils/enums';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export const Footer = () => {
  const { theme, setTheme } = useTheme();
  const valueLanguage = localStorage.getItem('valueLanguage') as
    | 'English'
    | 'Українська';
  const [value2, setValue2] = useState<'English' | 'Українська'>(
    valueLanguage || 'English',
  );
  const themeKeys = Object.keys(themeMap) as Array<keyof typeof themeMap>;
  const { t } = useTranslation();

  const setLanguage = (name: 'English' | 'Українська') => {
    setValue2(name);
    localStorage.setItem('valueLanguage', name);
  };

  const languageVariant = {
    English: 'en',
    Українська: 'uk',
  };

  useEffect(() => {
    i18n.changeLanguage(languageVariant[value2]);
  }, [value2]);

  const variantLogo = () => {
    const themeVariant =
      themeKeys.find(key => themeMap[key] === theme) || 'White';

    switch (themeVariant) {
      case 'White': {
        return logo;
      }

      case 'Dark': {
        return logo2;
      }

      case 'Theme3': {
        return logo3;
      }

      case 'Theme4': {
        return logo45;
      }

      case 'Theme5': {
        return logo45;
      }
    }
  };

  const handleGithub = () => {
    window.open('https://github.com/Anothar', '_blank');
  };

  return (
    <ContainerStyled>
      <FooterStyled>
        <Link to="/">
          <LogoImgStyled src={variantLogo()} alt="logo" />
        </Link>

        <InfoBlockStyled>
          <li onClick={handleGithub}>Github</li>

          <li onClick={handleGithub}>{t(StrCode.Contacts)}</li>

          <li onClick={handleGithub}>{t(StrCode.Rights)}</li>
        </InfoBlockStyled>

        <GoTopStyled onClick={scrollToTop}>
          {t(StrCode.BackToTop)}
          <Button
            variant="white"
            css="height: 32px; width: 32px; padding: 0;"
            onFunc={scrollToTop}
          >
            <VECTOR_SVG variant="top" />
          </Button>
        </GoTopStyled>

        <SelectorsStyled>
          <SelectInput
            label={t(StrCode.Theme)}
            items={themeKeys}
            variant="topSwipe"
            value={themeKeys.find(key => themeMap[key] === theme) || 'White'}
            setValue={setTheme}
            width="140px"
          />

          <SelectInput
            label={t(StrCode.Language)}
            items={['English', 'Українська']}
            variant="topSwipe"
            value={value2}
            setValue={setLanguage}
            width="140px"
          />
        </SelectorsStyled>
      </FooterStyled>
    </ContainerStyled>
  );
};
