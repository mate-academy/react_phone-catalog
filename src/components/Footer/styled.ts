import styled from 'styled-components';

const LogoImgStyled = styled.img`
  width: 89px;
  height: 32px;
`;

const FooterStyled = styled.div`
  width: 100%;
  padding: 32px 16px 32px 16px;
  box-shadow: 0px -1px 0px 0px #e2e6e9;

  display: flex;
  flex-direction: column;
  gap: 32px;
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
    font-size: 12px;
    line-height: 11px;
    color: #89939a;
  }
`;

const GoTopStyled = styled.div`
  color: #89939a;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  font-weight: 700;
  font-size: 12px;
  line-height: 15.34px;
  cursor: pointer;
`;

export { LogoImgStyled, FooterStyled, InfoBlockStyled, GoTopStyled };
