import { ButtonStyled } from './styled';

type Props = {
  variant: 'dark' | 'white' | 'disabled' | 'activate' | 'pagination';
  css?: string;
  children: React.ReactNode;
  onFunc?: () => void;
};

export const Button: React.FC<Props> = ({
  variant,
  css = '',
  children,
  onFunc = () => {},
}) => {
  return (
    <ButtonStyled variant={variant} cssStyle={css} onClick={onFunc}>
      {children}
    </ButtonStyled>
  );
};
