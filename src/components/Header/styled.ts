import styled, { css } from 'styled-components';
import { media } from '../../utils/const';

const HeaderStyled = styled.header`
  width: 100%;
  box-shadow: 0 1px 0 ${({ theme }) => theme.borderDefault};

  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 2;

  background-color: ${({ theme }) => theme.bacgroundDefault};
`;

const LogoStyled = styled.div`
  width: 64px;
  height: 22px;
  margin: 13px 16px;
  flex-shrink: 0;

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
  display: none;

  ${media.tablet} {
    display: flex;
    justify-content: space-between;
    width: calc(100vw - 96px);
  }

  ${({ isActive }) => {
    if (isActive) {
      return css`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: absolute;
        top: 49px;
        left: 0;
        background-color: ${({ theme }) => theme.bacgroundDefault};
        height: calc(100vh - 48px);
        padding-top: 32px;
        width: 100vw;
        transform: translateX(100%);
        z-index: 2;

        animation: downslide 0.7s ease forwards;

        @keyframes downslide {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `;
    }

    return '';
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
  color: ${({ theme }) => theme.textSecondColor};

  ${media.tablet} {
    padding: 0;
    height: auto;
  }
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
  background: #eb5757;
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
  MenuBoxStyled,
  MenuImgStyled,
  CountStyled,
};
