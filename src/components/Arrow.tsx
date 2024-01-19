import classNames from 'classnames';
import { ArrowDirections } from '../helpers/enums/ArrowDirections';

type ArrowProps = {
  direction: ArrowDirections
  buttonExtraClass?: string
  onClick: () => void
  disabled?: boolean
  dataCy?: string
};

export const Arrow = ({
  direction,
  buttonExtraClass,
  onClick,
  disabled,
  dataCy,
}: ArrowProps) => {
  const imageSrc = `img/arrows/arrow-${direction}${disabled ? '-disabled' : ''}.svg`;
  const alt = `Arrow ${direction}`;
  const buttonClasses = classNames(
    'arrow', { 'arrow--disabled': disabled }, buttonExtraClass,
  );

  return (
    <button
      className={buttonClasses}
      type="button"
      onClick={onClick}
      disabled={disabled}
      data-cy={dataCy}
    >
      <img
        className="arrow__img"
        src={imageSrc}
        alt={alt}
      />
    </button>
  );
};

Arrow.defaultProps = {
  buttonExtraClass: '',
  disabled: false,
  dataCy: '',
};
