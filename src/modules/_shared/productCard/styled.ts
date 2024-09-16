import styled, { css } from 'styled-components';

type CardProps = {
  variant: 'HomePage' | 'ListPage';
};

const CardStyled = styled.div<CardProps>`
  border: 1px solid #e2e6e9;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${({ variant }) => {
    switch (variant) {
      case 'HomePage': {
        return css`
          width: 212px;
          height: 439px;

          @media (min-width: 640px) {
            width: 237px;
            height: 512px;
          }

          @media (min-width: 1200px) {
            width: 272px;
            height: 506px;
          }
        `;
      }

      case 'ListPage': {
        return css`
          width: 287px;
          height: 440px;

          @media (min-width: 640px) {
            width: 229px;
            height: 506px;
          }

          @media (min-width: 1200px) {
            width: 272px;
            height: 506px;
          }
        `;
      }
    }
  }}

  &:hover {
    box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.1);
  }
`;

const ImgStyled = styled.img<CardProps>`
  width: 100%;
  object-fit: contain;

  ${({ variant }) => {
    switch (variant) {
      case 'HomePage': {
        return css`
          width: 148px;
          height: 129px;

          @media (min-width: 640px) {
            width: 173px;
            height: 202px;
          }

          @media (min-width: 1200px) {
            width: 208px;
            height: 196px;
          }
        `;
      }

      case 'ListPage': {
        return css`
          width: 223px;
          height: 130px;

          @media (min-width: 640px) {
            width: 165px;
            height: 196px;
          }

          @media (min-width: 1200px) {
            width: 208px;
            height: 196px;
          }
        `;
      }
    }
  }}
`;

const NameBlockStyled = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  color: #313237;
  text-align: center;
  padding-top: 16px;
`;

const CountBlockStyled = styled.div`
  font-weight: 800;
  font-size: 22px;
  line-height: 30.8px;
  color: #313237;
  text-align: left;

  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 8px;

  border-bottom: 1px solid #e2e6e9;
`;

const RegularPriceStyled = styled.div`
  font-weight: 600;
  line-height: 28.12px;
  color: #89939a;
  text-decoration: line-through;
`;

const InfoBlockStyled = styled.div`
  padding-block: 8px;
  height: 77px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  color: #89939a;
  font-weight: 700;
  font-size: 12px;
  line-height: 15.34px;

  > * {
    display: flex;
    justify-content: space-between;
  }
`;

const InfoStyled = styled.div`
  color: #313237;
`;

const ButtonsBlockStyled = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const ButtonAddStyled = styled.div`
  background-color: #313237;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
`;

const ButtonFavoritStyled = styled.div`
  background-color: white;
  width: 40px;
  height: 40px;
  border: 1px solid #b4bdc3;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  > * {
    width: 15.34px;
    object-fit: cover;
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
  ButtonAddStyled,
  ButtonFavoritStyled,
};
