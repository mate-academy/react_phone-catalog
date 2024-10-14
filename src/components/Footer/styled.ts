import styled from 'styled-components';
import { media } from '../../utils/const';

const LogoImgStyled = styled.img`
  width: 89px;
  height: 32px;
  user-select: none;
`;

const ContainerStyled = styled.footer`
  width: 100%;
  box-shadow: 0px -1px 0px 0px #e2e6e9;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.bacgroundDefault};

  ${media.desktop} {
    gap: 80px;
  }
`;

const FooterStyled = styled.div`
  padding: 32px 16px 32px 16px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  max-width: 1200px;

  ${media.tablet} {
    flex-direction: row;
    gap: 0;
    justify-content: space-between;
    padding: 32px;
    flex-wrap: wrap;
  }
`;

const InfoBlockStyled = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  display: flex;
  flex-direction: column;
  gap: 16px;

  > * {
    text-transform: uppercase;
    font-weight: 800;
    font-family: 'Mont-Bold', sans-serif;
    font-size: 12px;
    line-height: 11px;
    color: ${({ theme }) => theme.footerButton};
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.buttonHoverBacground};
    }
  }

  ${media.tablet} {
    flex-direction: row;
    gap: 13.5px;
    align-items: center;
  }

  ${media.desktop} {
    gap: 106.83px;
  }
`;

const GoTopStyled = styled.div`
  color: ${({ theme }) => theme.backToTop};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  font-weight: 700;
  font-size: 12px;
  line-height: 15.34px;
  cursor: pointer;
  font-family: 'Mont-SemiBold', sans-serif;

  ${media.tablet} {
    width: auto;
  }

  &:hover {
    color: ${({ theme }) => theme.textColor};
  }
`;

const SelectorsStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  flex: 1 1 100%;

  ${media.tablet} {
    flex-direction: row;
    justify-content: center;
    margin-top: 20px;
  }
`;

export {
  ContainerStyled,
  LogoImgStyled,
  FooterStyled,
  InfoBlockStyled,
  GoTopStyled,
  SelectorsStyled,
};
