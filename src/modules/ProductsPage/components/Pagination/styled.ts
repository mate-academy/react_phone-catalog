import styled from 'styled-components';
import { media } from '../../../../utils/const';

const PaginationStyled = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
  flex-wrap: wrap;

  ${media.tablet} {
    margin-top: 40px;
  }
`;

const ListItemStyled = styled.li`
  flex-shrink: 0;
`;

export { PaginationStyled, ListItemStyled };
