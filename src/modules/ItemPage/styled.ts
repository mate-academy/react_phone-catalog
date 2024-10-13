import styled from 'styled-components';
import { media } from '../../utils/const';

const ItemPageStyled = styled.div`
  padding: 24px 16px 64px;
  width: 100%;

  ${media.desktop} {
    max-width: 1136px;
    margin-inline: auto;
    padding: 24px 0 64px;
  }

  > :first-child {
    margin-bottom: 24px;

    ${media.tablet} {
      margin-bottom: 40px;
    }
  }
`;

const TitleStyled = styled.h2`
  margin: 0;
  margin-bottom: 32px;
  font-weight: 800;
  font-size: 32px;
  line-height: 41px;
  font-family: 'Mont-Bold', sans-serif;
  color: ${({ theme }) => theme.textColor};

  ${media.tablet} {
    margin-bottom: 40px;
    font-size: 48px;
    line-height: 56px;
  }
`;

const MainInfoStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  margin-bottom: 56px;

  ${media.tablet} {
    gap: 17px;
    flex-direction: row;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 64px;
  }

  ${media.desktop} {
    margin-bottom: 80px;
  }
`;

const ImagesStyled = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 16px;
  align-items: center;
  width: 288px;

  ${media.tablet} {
    width: 100%;
    flex-direction: row;
    align-items: start;
  }

  ${media.desktop} {
    width: 560px;
  }
`;

const MainImgStyled = styled.img`
  width: 100%;
  object-fit: contain;

  &:hover {
    transform: scale(1.1);
  }

  ${media.tablet} {
    width: 70%;
    min-width: 287px;
    max-height: 435px;
  }

  ${media.desktop} {
    width: 464px;
    max-height: 465px;
  }
`;

const ImgMiniBlockStyled = styled.div`
  width: 100%;
  height: 49px;
  display: flex;
  gap: 8px;
  overflow: auto;
  flex-shrink: 0;

  ${media.tablet} {
    width: 35px;
    height: 100%;
    flex-direction: column;
  }

  ${media.desktop} {
    width: 80px;
  }
`;

type MiniImgProps = {
  isActive: boolean;
};

const MiniImg = styled.img<MiniImgProps>`
  width: 51px;
  object-fit: contain;
  border: 1px solid
    ${({ isActive, theme }) =>
      isActive ? theme.textColor : theme.optionBorder};

  cursor: pointer;

  ${media.tablet} {
    width: 35px;
    height: 35px;
  }

  ${media.desktop} {
    width: 80px;
    height: 80px;
  }
`;

const AboutSpecsStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 56px;
  margin-bottom: 56px;

  ${media.tablet} {
    margin-bottom: 64px;
    gap: 64px;
  }

  ${media.desktop} {
    margin-bottom: 80px;
    flex-direction: row;
  }
`;

const AboutStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  ${media.desktop} {
    width: 560px;
  }
`;

const SpecsStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  ${media.desktop} {
    width: 512px;
  }
`;

const TitleNameStyled = styled.div`
  padding-bottom: 16px;
  font-weight: 700;
  font-size: 20px;
  line-height: 25.56px;
  border-bottom: 1px solid ${({ theme }) => theme.optionBorder};
  font-family: Mont-SemiBold, sans-serif;
  color: ${({ theme }) => theme.textColor};

  ${media.tablet} {
    font-family: Mont-Bold, sans-serif;
    font-weight: 800;
    font-size: 22px;
    line-height: 30.8px;
  }
`;

const InfoSpecsStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: ${({ theme }) => theme.textSecondColor};
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;

  > * {
    display: flex;
    justify-content: space-between;
  }
`;

const InfoSpecsSecStyled = styled.div`
  color: ${({ theme }) => theme.textColor};
`;

const AboutInfoStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  > *:first-child {
    font-weight: 700;
    font-family: Mont-SemiBold, sans-serif;
    font-size: 16px;
    line-height: 20.45px;
    color: ${({ theme }) => theme.textColor};

    ${media.tablet} {
      font-size: 20px;
      line-height: 25.56px;
    }
  }

  > *:last-child {
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
    color: ${({ theme }) => theme.textSecondColor};
  }
`;

export {
  ItemPageStyled,
  TitleStyled,
  MainInfoStyled,
  ImagesStyled,
  MainImgStyled,
  ImgMiniBlockStyled,
  MiniImg,
  AboutSpecsStyled,
  AboutStyled,
  SpecsStyled,
  TitleNameStyled,
  InfoSpecsStyled,
  InfoSpecsSecStyled,
  AboutInfoStyled,
};
