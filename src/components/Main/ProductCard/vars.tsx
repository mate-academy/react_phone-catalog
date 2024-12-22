import styled from 'styled-components';
import { StyledButtonProps, StyledCardProps } from '../../../types/TProductCard';

export const StyledCard = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'margin' && prop !== 'width', // фільтруємо ці пропси
})<StyledCardProps>`
  max-width: ${({ width }) => width};
  margin: ${({ margin }) => margin};
`;

export const StyledButton = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'width', // фільтруємо цей пропс
})<StyledButtonProps>`
  width: ${({ width }) => width};
`;
