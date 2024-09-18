import { ButtonStyled } from './styled';

type Props = {
  variant: 'dark' | 'white';
  css?: string;
  children: React.ReactNode;
};

export const Button: React.FC<Props> = ({ variant, css = '', children }) => {
  return (
    <ButtonStyled variant={variant} cssStyle={css}>
      {children}
    </ButtonStyled>
  );
};
