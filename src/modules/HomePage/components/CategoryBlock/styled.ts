import styled, { css } from 'styled-components';
import { media } from '../../../../utils/const';
import { NavLink } from 'react-router-dom';

const ContainerStyled = styled.div`
  padding-inline: 16px;

  ${media.desktop} {
    padding: 0;
  }
`;

const CategoryTitleStyled = styled.div`
  margin-bottom: 24px;
  font-size: 22px;
  font-weight: 800;
  font-family: 'Mont-Bold', sans-serif;
  line-height: 30.8px;
  color: ${({ theme }) => theme.textColor};

  ${media.tablet} {
    font-size: 32px;
    line-height: 41px;
  }
`;

const CategotyStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  ${media.tablet} {
    width: 100%;
    flex-direction: row;
    gap: 16px;
  }
`;

const CategoryItemStyled = styled(NavLink)`
  text-decoration: none;
  display: flex;
  gap: 4px;
  flex-direction: column;

  ${media.tablet} {
    flex: 1;
  }
`;

type ImgContainerType = {
  variang: 'first' | 'second' | 'three';
};

const ContainerImgStyled = styled.div<ImgContainerType>`
  width: 100%;
  position: relative;

  ${({ variang }) => {
    switch (variang) {
      case 'first': {
        return css`
          background-color: #6d6474;
          padding: 60px 0 0 60px;
        `;
      }

      case 'second': {
        return css`
          background-color: #8d8d92;
          padding: 20px 0 0 20px;
        `;
      }

      case 'three': {
        return css`
          background-color: #973d5f;
          padding: 60px 0 0 60px;
        `;
      }
    }
  }}

  &:hover {
    transform: scale(1.1);
  }
`;

const CategoryImageStyled = styled.div<ImgContainerType>`
  width: 100%;
  padding-top: 100%;
  background-image: url('/img/category-phones.webp');
  background-position: top left;
  background-repeat: no-repeat;

  ${({ variang }) => {
    switch (variang) {
      case 'first': {
        return css`
          background-image: url('/img/category-phones.webp');
          background-size: 110%;
        `;
      }

      case 'second': {
        return css`
          background-image: url('/img/category-tablets.png');
          background-size: 155%;
        `;
      }

      case 'three': {
        return css`
          background-image: url('/img/category-accessories.webp');
          background-size: 130%;
        `;
      }
    }
  }}
`;

const CategoryTextStyled = styled.div`
  font-weight: 700;
  font-size: 20px;
  line-height: 25.56px;
  color: ${({ theme }) => theme.textColor};
  font-family: 'Mont-SemiBold', sans-serif;
`;

const SecondTextStyled = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  color: ${({ theme }) => theme.textSecondColor};
`;

export {
  ContainerStyled,
  CategoryTitleStyled,
  CategotyStyled,
  CategoryItemStyled,
  ContainerImgStyled,
  CategoryImageStyled,
  CategoryTextStyled,
  SecondTextStyled,
};
