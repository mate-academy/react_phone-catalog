import cn from 'classnames';

type Props = {
  title: string;
  buttonUse: string;
  onClick: () => void;
  added?: boolean;
};

export const Button: React.FC<Props> = ({
  title,
  buttonUse,
  onClick,
  added,
}) => {
  return (
    <div
      className={cn(`button`, `button--${buttonUse}`, {
        [`button--${buttonUse}-added`]: added,
      })}
      onClick={onClick}
    >
      {title}
    </div>
  );
};
