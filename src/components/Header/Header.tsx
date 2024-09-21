import {
  HeaderStyled,
  ListItemStyled,
  LogoStyled,
  MenuBoxStyled,
  MenuImgStyled,
  MenuStyled,
  NavListStyled,
  NavStyled,
} from './styled';
import logo from '../../icons/Logo.png';
import logo2 from '../../icons/Logo2.png';
import { useState } from 'react';
import { themeMap, useTheme } from '../Themes/ThemeProvider';
import {
  BURGERMENU_SVG,
  CLOSING_SVG,
  LIKE_SVG,
  SHOPPING_SVG,
} from '../../utils/SVG';

export const Header = () => {
  const [isManuActive, setIsActiveMenu] = useState(false);
  const { theme } = useTheme();
  const themeKeys = Object.keys(themeMap) as Array<keyof typeof themeMap>;

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
    <HeaderStyled>
      <LogoStyled>
        <img alt="logo" src={variantLogo()} />
      </LogoStyled>

      <MenuStyled
        isMenu={true}
        onClick={() => setIsActiveMenu(prevValue => !prevValue)}
      >
        {isManuActive ? (
          <MenuImgStyled>
            <CLOSING_SVG />
          </MenuImgStyled>
        ) : (
          <MenuImgStyled>
            <BURGERMENU_SVG />
          </MenuImgStyled>
        )}
      </MenuStyled>

      <NavStyled isActive={isManuActive}>
        <NavListStyled>
          <ListItemStyled>home</ListItemStyled>
          <ListItemStyled>Phones</ListItemStyled>
          <ListItemStyled>tablets</ListItemStyled>
          <ListItemStyled>accessories</ListItemStyled>
        </NavListStyled>

        <MenuStyled isActive={!isManuActive} isMenu={false}>
          <MenuBoxStyled>
            <MenuImgStyled>
              <LIKE_SVG />
            </MenuImgStyled>
          </MenuBoxStyled>

          <MenuBoxStyled>
            <MenuImgStyled>
              <SHOPPING_SVG />
            </MenuImgStyled>
          </MenuBoxStyled>
        </MenuStyled>
      </NavStyled>
    </HeaderStyled>
  );
};
