type Props = {
  iconType: string;
  iconUse: string;
  onClick?: () => void;
};

export const Icon: React.FC<Props> = ({ iconType, iconUse, onClick }) => {
  return (
    <>
      <div
        className={`icon icon--${iconType} icon--${iconUse}`}
        onClick={onClick}
      />
    </>
  );
};
