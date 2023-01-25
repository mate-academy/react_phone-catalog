import { PrimaryButtonT } from '../types/PrimeryButtonT';

const SquareButton: React.FC<PrimaryButtonT> = (props) => {
  const {
    children,
    classModificator = '',
    OnClick,
    disabled = false,
  } = props;

  return (
    <button
      type="button"
      onClick={OnClick}
      className={`square-button ${classModificator}`}
      disabled={disabled}
    >
      { children }
    </button>
  );
};

export default SquareButton;
