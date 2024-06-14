import { Errow } from './Errow';

type Props = {
  className: string;
  onClick?: () => void;
  disabled?: boolean;
};

export const ButtonWithErrow: React.FC<Props> = ({
  className,
  onClick = () => {},
  disabled = false,
}) => {
  return (
    <button className={`${className}`} onClick={onClick} disabled={disabled}>
      <Errow />
    </button>
  );
};
