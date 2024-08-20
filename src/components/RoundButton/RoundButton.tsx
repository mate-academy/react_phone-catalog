import './RoundButton.scss';

interface RoundButtonProps {
  buttonType: string;
  onClick: () => void;
  disabled?: boolean;
}

export const RoundButton: React.FC<RoundButtonProps> = ({
  buttonType,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      className={`round-button round-button--${buttonType} ${disabled ? 'round-button--disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
    ></button>
  );
};
