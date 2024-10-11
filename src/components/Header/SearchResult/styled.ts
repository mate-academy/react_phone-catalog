import styled, { css } from 'styled-components';
import { media } from '../../../utils/const';

type SearchResultType = {
  isActive: boolean;
};

const SearchResultStyled = styled.div<SearchResultType>`
  position: absolute;
  top: 53px;
  width: calc(100vw - 32px);
  margin-inline: 16px;
  max-width: 500px;
  right: 0;
  gap: 10px;
  min-width: 286px;

  height: ${({ isActive }) => (isActive ? '400px' : '0px')};
  border: 1px solid ${({ theme }) => theme.buttonSecondBorder};
  background-color: ${({ theme }) => theme.bacgroundDefault};

  opacity: ${({ isActive }) => (isActive ? '1' : '0')};
  box-shadow: 0 3px 5px 0 ${({ theme }) => theme.buttonHoverShadow};

  display: flex;
  flex-direction: column;

  ${media.desktop} {
    top: 69px;
  }

  ${({ isActive }) =>
    !isActive &&
    css`
      & * {
        display: none !important;
      }
    `}
`;

const SearchListStyled = styled.ul`
  z-index: 3;
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: auto;
  padding: 30px;
`;

const NoResultStyled = styled.div`
  font-size: 25px;
  line-height: 41px;
  color: #313237;
  padding: 30px 30px 10px;
  height: 266px;

  display: flex;
  flex-direction: column;

  ${media.tablet} {
    height: 319px;
  }

  & * {
    max-height: 185px;
    object-fit: contain;

    ${media.tablet} {
      max-height: 238px;
    }
  }
`;

const SearchItemsStyled = styled.li`
  display: flex;
  border: 1px solid ${({ theme }) => theme.buttonSecondBorder};
  padding: 10px;
  text-align: center;
  align-items: center;
  gap: 5px;
  justify-content: space-between;
  cursor: pointer;

  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  color: ${({ theme }) => theme.textColor};

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 3px 13px 0 ${({ theme }) => theme.buttonHoverShadow};
  }
`;

const ImgStyled = styled.img`
  width: 66px;
  height: 66px;
  object-fit: contain;

  &:hover {
    transform: scale(1.1);
  }
`;

const PriceStyled = styled.div`
  font-weight: 800;
  font-size: 22px;
  line-height: 30.8px;
  font-family: 'Mont-Bold', sans-serif;
`;

const ButtonsStyled = styled.div`
  display: flex;
  gap: 10px;
  align-items: start;
  margin: 0 30px 30px;
  flex-wrap: wrap;
`;

export {
  SearchResultStyled,
  SearchListStyled,
  NoResultStyled,
  SearchItemsStyled,
  ImgStyled,
  PriceStyled,
  ButtonsStyled,
};
