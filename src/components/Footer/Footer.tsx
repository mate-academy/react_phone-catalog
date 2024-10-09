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
  const [value2, setValue2] = useState<'English' | 'Українська'>('English');
  const themeKeys = Object.keys(themeMap) as Array<keyof typeof themeMap>;
  const { t } = useTranslation();

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

      default: {
        return logo;
      }
    }
  };

  return (
    <ContainerStyled>
      <FooterStyled>
        <Link to="/">
          <LogoImgStyled src={variantLogo()} alt="logo" />
        </Link>

        <InfoBlockStyled>
          <li>Github</li>

          <li>{t(StrCode.Contacts)}</li>

          <li>{t(StrCode.Rights)}</li>
        </InfoBlockStyled>

        <GoTopStyled onClick={scrollToTop}>
          {t(StrCode.BackToTop)}
          <Button variant="white" css="height: 32px; width: 32px; padding: 0;">
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
            setValue={setValue2}
            width="140px"
          />
        </SelectorsStyled>
      </FooterStyled>
    </ContainerStyled>
  );
};
