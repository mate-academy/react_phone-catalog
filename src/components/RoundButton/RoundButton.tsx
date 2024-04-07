import './RoundButton.scss';

interface RoundButtonProps {
  buttonType: string;
  onClick: () => void;
}

export const RoundButton: React.FC<RoundButtonProps> = ({
  buttonType,
  onClick,
}) => {
  return (
    <button
      className={`round-button round-button--${buttonType}`}
      onClick={onClick}
    ></button>
  );
};
