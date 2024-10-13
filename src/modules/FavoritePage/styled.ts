import styled from 'styled-components';
import { media } from '../../utils/const';

const FavoritePageStyled = styled.div`
  padding: 24px 16px 56px;

  ${media.desktop} {
    max-width: 1136px;
    min-width: 1136px;
    margin-inline: auto;
    padding: 24px 0 64px;
  }
`;

const TitleStyled = styled.h2`
  margin: 24px 0 8px;
  font-weight: 800;
  font-size: 32px;
  line-height: 41px;
  font-family: 'Mont-Bold', sans-serif;
  color: ${({ theme }) => theme.textColor};

  ${media.tablet} {
    font-size: 48px;
    line-height: 56px;
    margin: 40px 0 8px;
  }
`;

const ModelsStyled = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  color: ${({ theme }) => theme.textSecondColor};
  margin-bottom: 32px;
`;

const NotFoundStyled = styled.div`
  font-size: 32px;
  line-height: 41px;
  margin-top: 20px;

  color: ${({ theme }) => theme.textColor};
`;

export { FavoritePageStyled, TitleStyled, ModelsStyled, NotFoundStyled };
