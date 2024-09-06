import cn from 'classnames';

type Props = {
  iconType: string;
  iconUse: string;
  iconSize?: string;
  length?: number;
  onClick?: () => void;
  disabled?: boolean;
  added?: boolean;
  border?: boolean;
};

export const Icon: React.FC<Props> = ({
  iconType,
  iconUse,
  iconSize,
  length,
  onClick,
  disabled,
  added,
  border,
}) => {
  return (
    <div className="icon__wrapper" onClick={onClick}>
      <div
        id={`icon--${iconType}-counter`}
        className={cn(`icon icon--${iconType}`, {
          [`icon--${iconType}-disabled`]: disabled,
          [`icon--${iconType}-added`]: added,
          [`icon--${iconType}-counter`]: length && length > 0,
          [`icon--${iconUse}-border`]: border,
          [`icon--${iconUse}-border-disabled`]: border && disabled,
          [`icon--${iconUse}`]: !iconSize,
          [`icon--${iconUse}-${iconSize}`]: iconSize,
        })}
      />
      {(iconUse === 'bar' || iconUse === 'menu') && length !== 0 && (
        <div className="icon__content">{length}</div>
      )}
    </div>
  );
};
