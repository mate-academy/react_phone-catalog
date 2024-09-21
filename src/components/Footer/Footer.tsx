import {
  ContainerStyled,
  FooterStyled,
  GoTopStyled,
  InfoBlockStyled,
  LogoImgStyled,
  SelectorsStyled,
} from './styled';
import logo from '../../icons/Logo.png';
import { Button } from '../Button/Button';
import { VECTOR_SVG } from '../../utils/SVG';
import { SelectInput } from '../Inputs/SelectInput/SelectInput';
import { useState } from 'react';
import { themeMap, useTheme } from '../Themes/ThemeProvider';

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export const Footer = () => {
  const { theme, setTheme } = useTheme();
  const [value2, setValue2] = useState('English');
  const themeKeys = Object.keys(themeMap) as Array<keyof typeof themeMap>;

  return (
    <ContainerStyled>
      <FooterStyled>
        <LogoImgStyled src={logo} alt="logo" />

        <InfoBlockStyled>
          <li>Github</li>

          <li>Contacts</li>

          <li>rights</li>
        </InfoBlockStyled>

        <GoTopStyled onClick={scrollToTop}>
          Back to top
          <Button variant="white" css="height: 32px; width: 32px; padding: 0;">
            <VECTOR_SVG variant="top" />
          </Button>
        </GoTopStyled>

        <SelectorsStyled>
          <SelectInput
            label="Theme"
            items={themeKeys}
            variant="topSwipe"
            value={themeKeys.find(key => themeMap[key] === theme) || 'White'}
            setValue={setTheme}
            width="140px"
          />

          <SelectInput
            label="Language"
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
