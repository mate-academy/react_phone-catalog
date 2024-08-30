type Props = {
  iconType: string;
  iconUse: string;
  disabled?: string;
  onClick?: () => void;
};

export const Icon: React.FC<Props> = ({
  iconType,
  iconUse,
  disabled,
  onClick,
}) => {
  return (
    <>
      <div
        className={`icon icon--${iconType} icon--${iconUse} icon--${iconType}-${disabled}`}
        onClick={onClick}
      />
    </>
  );
};
