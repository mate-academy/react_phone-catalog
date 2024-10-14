import { ButtonStyled } from './styled';

type Props = {
  variant:
    | 'dark'
    | 'white'
    | 'disabled'
    | 'activate'
    | 'pagination'
    | 'capacity'
    | 'notCapacity';
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
  const handleChildClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    onFunc();
  };

  return (
    <ButtonStyled variant={variant} cssStyle={css} onClick={handleChildClick}>
      {children}
    </ButtonStyled>
  );
};
