import styled, { css, keyframes } from 'styled-components';
import { media } from '../../utils/const';
import { NavLink } from 'react-router-dom';

const HeaderStyled = styled.header`
  width: 100%;
  box-shadow: 0 1px 0 ${({ theme }) => theme.borderDefault};

  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 4;

  background-color: ${({ theme }) => theme.bacgroundDefault};
`;

const LogoStyled = styled.div`
  width: 64px;
  height: 22px;
  margin: 13px 16px;
  flex-shrink: 0;
  user-select: none;

  ${media.desktop} {
    width: 80px;
    height: 28px;
    margin: 18px 24px;
  }

  > * {
    width: 100%;
    height: 100%;
  }
`;

type MenuProps = {
  isActive?: boolean;
  isMenu: boolean;
};

const MenuStyled = styled.div<MenuProps>`
  ${({ isMenu }) => {
    if (isMenu) {
      return css`
        ${media.tablet} {
          display: none;
        }
      `;
    }

    return '';
  }}

  ${({ isActive = true }) => {
    if (isActive) {
      return css`
        width: 48px;
        height: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: -1px 0 0 ${({ theme }) => theme.borderDefault};

        ${media.tablet} {
          width: auto;
          height: auto;
        }
      `;
    } else {
      return css`
        width: 100%;
        border-top: 1px solid ${({ theme }) => theme.borderDefault};
        display: flex;
      `;
    }
  }}
`;

type NavProps = {
  isActive: boolean;
};

const NavStyled = styled.nav<NavProps>`
  transform: translateX(100%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  top: 48px;
  left: 0;
  padding-top: 32px;
  width: 100vw;
  background-color: ${({ theme }) => theme.bacgroundDefault};
  height: calc(100dvh - 48.4px);

  ${media.tablet} {
    transform: translateX(0);
    display: flex;
    flex-direction: row;
    position: static;
    padding: 0;
    height: 100%;
    background-color: none;
    width: calc(100vw - 96px);
    opacity: 1;
  }

  ${({ isActive }) => {
    if (isActive) {
      return css`
        transform: translateX(0);
        z-index: 2;
      `;
    } else {
      return css``;
    }
  }}
`;

const NavListStyled = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100vw;
  z-index: 1;
  background-color: ${({ theme }) => theme.bacgroundDefault};

  ${media.tablet} {
    flex-direction: row;
    gap: 32px;
    width: auto;
    margin-inline: 16px;
  }
`;

const ListItemStyled = styled.li`
  text-transform: uppercase;
  height: 27px;
  padding-block: 8px;
  font-size: 12px;
  font-weight: 800;
  font-family: 'Mont-Bold', sans-serif;
  line-height: 11px;
  position: relative;

  ${media.tablet} {
    padding: 0;
    height: 100%;
  }
`;

const appearAnimation = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

type NavLinkType = {
  isIcon?: boolean;
};

const NavLinkStyled = styled(NavLink)<NavLinkType>`
  text-decoration: none;
  color: ${({ theme }) => theme.textSecondColor};
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;

  &:hover {
    color: ${({ theme }) => theme.textColor};
  }

  &.active {
    color: ${({ theme }) => theme.textColor};

    &:after {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      background-color: ${({ theme }) => theme.textColor};
      left: 0;
      bottom: 0;
      border-radius: 1px;
      animation: ${appearAnimation} 0.3s ease forwards;

      ${({ isIcon }) => {
        if (isIcon) {
          return css`
            bottom: 0;
            border-radius: 0;
          `;
        }

        return css`
          bottom: 0;
        `;
      }}
    }
  }

  ${({ isIcon }) => {
    if (isIcon) {
      return css`
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      `;
    }

    return;
  }}
`;

const MenuBoxStyled = styled.div`
  width: 50%;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: -1px 0 0 ${({ theme }) => theme.borderDefault};
  position: relative;

  ${media.tablet} {
    width: 48px;
    height: 48px;
  }

  ${media.desktop} {
    width: 64px;
    height: 64px;
  }
`;

const MenuImgStyled = styled.div`
  width: 16px;
  height: 16px;

  svg {
    fill: ${({ theme }) => theme.buttonSecondColor} !important;
  }
`;

const CountStyled = styled.div`
  position: absolute;
  width: 14px;
  height: 14px;
  border: 1px solid ${({ theme }) => theme.bacgroundDefault};
  background: ${({ theme }) => theme.iconColor};
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 9px;
  line-height: 11.5px;
  color: ${({ theme }) => theme.textThreeColor};

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) translate(7px, -7px);
`;

export {
  HeaderStyled,
  LogoStyled,
  MenuStyled,
  NavStyled,
  NavListStyled,
  ListItemStyled,
  NavLinkStyled,
  MenuBoxStyled,
  MenuImgStyled,
  CountStyled,
};
