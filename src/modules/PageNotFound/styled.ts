import styled from 'styled-components';
import { media } from '../../utils/const';

const NotFoundStyled = styled.div`
  padding: 24px 16px 64px;
  display: flex;
  flex-direction: column;

  align-items: center;
  gap: 20px;

  font-size: 32px;
  line-height: 41px;

  color: ${({ theme }) => theme.textColor};

  ${media.desktop} {
    max-width: 1136px;
    min-width: 1136px;
    margin-inline: auto;
    padding: 24px 0 64px;
  }

  & > :first-child {
    align-self: start;
  }
`;

export { NotFoundStyled };
