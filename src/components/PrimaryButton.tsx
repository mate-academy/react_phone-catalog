import { PrimaryButtonT } from '../types/PrimeryButtonT';

const PrimaryButton: React.FC<PrimaryButtonT> = (props) => {
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
      className={`primary-button ${classModificator}`}
      disabled={disabled}
    >
      { children }
    </button>
  );
};

export default PrimaryButton;
