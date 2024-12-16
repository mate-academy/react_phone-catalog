import styled from 'styled-components';
import { StyledButtonProps, StyledCardProps } from '../../../types/TProductCard';

export const StyledCard = styled.div<StyledCardProps>`
  max-width: ${({ width }) => width};
  margin: ${({ margin }) => margin};
`;

export const StyledButton = styled.div<StyledButtonProps>`
  width: ${({ width }) => width};
`;
