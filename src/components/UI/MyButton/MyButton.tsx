import './MyButton.scss';

type Props = {
  children: React.ReactNode;
  handleClick: () => void;
  disabled?: boolean;
};

export const MyButton: React.FC<Props> = ({
  children,
  handleClick,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      className="my-button"
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
