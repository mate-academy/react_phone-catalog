import styled from 'styled-components';

const HomePageStyled = styled.div`
  @media (min-width: 1200px) {
    max-width: 1136px;
    margin-inline: auto;
  }
`;

const TitleStyled = styled.h2`
  font-weight: 800;
  font-size: 32px;
  line-height: 41px;
  margin: 24px 16px;
  color: #313237;
  width: 288px;

  @media (min-width: 640px) {
    margin: 32px 24px;
    font-size: 48px;
    line-height: 56px;
    width: 490px;
  }

  @media (min-width: 1200px) {
    padding: 56px 32px;
    margin: 0;
    width: 100%;
  }
`;

export { TitleStyled, HomePageStyled };
