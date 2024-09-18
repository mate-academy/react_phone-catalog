import {
  ContainerStyled,
  FooterStyled,
  GoTopStyled,
  InfoBlockStyled,
  LogoImgStyled,
} from './styled';
import logo from '../../icons/Logo.png';
import { Button } from '../Button/Button';
import { VECTOR_SVG } from '../../utils/SVG';

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export const Footer = () => {
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
      </FooterStyled>
    </ContainerStyled>
  );
};
