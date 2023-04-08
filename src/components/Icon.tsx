type Props = {
  cartsNumber: number,
  icon: string,
};

export const Icon: React.FC<Props> = ({
  cartsNumber,
  icon,
}) => (
  <div className={`header-icon-${icon}`}>
    {cartsNumber > 0 && (
      <div className={`header-icon-${icon}__circle`}>
        <div>{cartsNumber}</div>
      </div>
    )}
  </div>
);
