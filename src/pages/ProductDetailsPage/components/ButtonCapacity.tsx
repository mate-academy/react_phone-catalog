import cn from 'classnames';

type Props = {
  capacity: string;
  currentCapcity: string;
  onClick: (color: string, capacity: string) => void;
};

export const ButtonCapcity: React.FC<Props> = ({
  capacity,
  currentCapcity,
  onClick,
}) => {
  return (
    <button
      className={cn('details__capacity-button', {
        'details__capacity-button-active': currentCapcity === capacity,
      })}
      id="details__capacity-button"
      onClick={() => onClick(currentCapcity, capacity)}
    >
      {capacity}
    </button>
  );
};
