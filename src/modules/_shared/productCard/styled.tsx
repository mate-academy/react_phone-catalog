import styled, { css } from 'styled-components';
import { media } from '../../../utils/const';

type CardProps = {
  variant: 'HomePage' | 'ListPage';
};

const CardStyled = styled.div<CardProps>`
  border: 1px solid ${({ theme }) => theme.cardBorder};
  background-color: ${({ theme }) => theme.cardBacground};
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius};

  ${({ variant }) => {
    switch (variant) {
      case 'HomePage': {
        return css`
          width: 212px;
          height: 439px;

          ${media.tablet} {
            width: 237px;
            height: 512px;
          }

          ${media.desktop} {
            width: 272px;
            height: 506px;
          }
        `;
      }

      case 'ListPage': {
        return css`
          height: 440px;

          ${media.tablet} {
            height: 506px;
          }
        `;
      }
    }
  }}

  &:hover {
    box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.1);
    border: 1px solid ${({ theme }) => theme.cardBorderHover};
  }
`;

const ImgStyled = styled.img<CardProps>`
  width: 100%;
  object-fit: contain;
  align-self: center;

  ${({ variant }) => {
    switch (variant) {
      case 'HomePage': {
        return css`
          width: 148px;
          height: 129px;

          ${media.tablet} {
            width: 173px;
            height: 202px;
          }

          ${media.desktop} {
            width: 208px;
            height: 196px;
          }
        `;
      }

      case 'ListPage': {
        return css`
          height: 130px;

          ${media.tablet} {
            height: 196px;
          }
        `;
      }
    }
  }}

  &:hover {
    transform: scale(1.1);
  }
`;

const NameBlockStyled = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  color: ${({ theme }) => theme.textColor};
  text-align: center;
  padding-top: 16px;
`;

const CountBlockStyled = styled.div`
  font-weight: 800;
  font-size: 22px;
  line-height: 30.8px;
  color: ${({ theme }) => theme.textColor};
  text-align: left;
  font-family: 'Mont-Bold', sans-serif;

  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 8px;

  border-bottom: 1px solid ${({ theme }) => theme.optionBorder};
`;

const RegularPriceStyled = styled.div`
  font-family: 'Mont-Regular', sans-serif;
  font-weight: 600;
  line-height: 28.12px;
  color: ${({ theme }) => theme.textSecondColor};
  text-decoration: line-through;
`;

const InfoBlockStyled = styled.div`
  padding-block: 8px;
  height: 77px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  color: ${({ theme }) => theme.textSecondColor};
  font-weight: 700;
  font-size: 12px;
  line-height: 15.34px;
  font-family: 'Mont-SemiBold', sans-serif;

  > * {
    display: flex;
    justify-content: space-between;
  }
`;

const InfoStyled = styled.div`
  color: ${({ theme }) => theme.textColor};
`;

const ButtonsBlockStyled = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;

  & > :last-child {
    flex-shrink: 0;
  }
`;

const ImgFavoriteStyled = styled.img`
  width: 15.34px;
  object-fit: cover;
`;

const SkeletonImg = styled.div`
  height: 130px;

  ${media.tablet} {
    height: 196px;
  }
`;

export {
  CardStyled,
  ImgStyled,
  NameBlockStyled,
  CountBlockStyled,
  RegularPriceStyled,
  InfoBlockStyled,
  InfoStyled,
  ButtonsBlockStyled,
  ImgFavoriteStyled,
  SkeletonImg,
};
