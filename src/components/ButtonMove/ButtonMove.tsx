type Props = {
  icon: string;
};

export const ButtonMove: React.FC<Props> = ({ icon }) => {
  return (
    <div className="button">
      <div className={`icon icon-${icon}`} />
    </div>
  );
};
