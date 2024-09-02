import cn from 'classnames';

type Props = {
  iconType: string;
  iconUse: string;
  disabled?: boolean;
  onClick?: () => void;
  added?: boolean;
};

export const Icon: React.FC<Props> = ({
  iconType,
  iconUse,
  disabled,
  onClick,
  added,
}) => {
  return (
    <>
      <div
        className={cn(`icon icon--${iconType}`, `icon--${iconUse}`, {
          [`icon--${iconType}-disabled`]: disabled,
          [`icon--${iconType}-added`]: added,
        })}
        onClick={onClick}
      />
    </>
  );
};
