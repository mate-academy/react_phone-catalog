import style from './ButtonWithIcon.module.scss';
import IconFavorites from '../../modules/shared/icons/iconFavorites.svg?react';
import IconArrow from '../../modules/shared/icons/iconArrow.svg?react';
import IconPlus from '../../modules/shared/icons/IconPlus.svg?react';
import IconMinus from '../../modules/shared/icons/IconMinus.svg?react';

type Props = {
  iconName?: string;
  value?: string | number;
  rotate?: number;
  disabled?: boolean;
  size?: number;
  className?: string;
  onClick?: () => void;
  isToggled?: boolean;
};

export const ButtonWithIcon = ({
  iconName = 'arrow',
  value,
  rotate = 0,
  disabled = false,
  size = 32,
  className,
  onClick,
  isToggled = false,
}: Props) => {
  const handleClick = () => onClick?.();

  const getIcon = () => {
    switch (iconName) {
      case 'arrow':
      case 'bannerArrow':
        return (
          <IconArrow
            style={{
              color: disabled ? '#B4BDC3' : '#313237',
              transform: `rotate(${rotate}deg)`,
            }}
          />
        );

      case 'favourites':
        return (
          <IconFavorites
            style={{
              color: isToggled ? '#EB5757' : '#ffffff',
              stroke: isToggled ? '#EB5757' : '#313237',
              transition: 'fill 0.3s, stroke 0.3s',
            }}
          />
        );
      case 'plus':
        return <IconPlus style={{ color: disabled ? '#B4BDC3' : '#313237' }} />;
      case 'minus':
        return (
          <IconMinus style={{ color: disabled ? '#B4BDC3' : '#313237' }} />
        );
      case 'number':
      case 'else':
        return <span>{value}</span>;

      default:
        return null;
    }
  };

  return (
    <button
      type="button"
      className={`${style.button} ${(disabled || isToggled) && style['button--no-hover']} ${className && style[className]}`}
      onClick={handleClick}
      style={{
        width: size,
        height: iconName === 'bannerArrow' ? '100%' : size,
        borderColor: isToggled ? '#E2E6E9' : '',
      }}
      disabled={disabled}
    >
      {getIcon()}
    </button>
  );
};
