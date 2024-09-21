import { OptionStyled, OptionsSelectStyled } from './styled';

type Props = {
  items: string[];
  isActive: boolean;
  css: { [key: string]: string };
  isClick: (item: string) => void;
  activeItem: string;
  variant: 'default' | 'topSwipe';
};

const OptionSwiper: React.FC<Props> = ({
  items,
  isActive,
  css,
  isClick,
  activeItem,
  variant,
}) => {
  return (
    <OptionsSelectStyled css={css} isActive={isActive} variant={variant}>
      {items.map(item => (
        <OptionStyled
          onClick={() => isClick(item)}
          isActive={activeItem === item}
          key={item}
        >
          {item}
        </OptionStyled>
      ))}
    </OptionsSelectStyled>
  );
};

export default OptionSwiper;
