type Props = {
  cartsNumber?: number,
  icon: string,
};

export const Icon: React.FC<Props> = ({
  cartsNumber,
  icon,
}) => (
  <div className={`header-icon-${icon}`}>
    {!!cartsNumber && cartsNumber > 0 && (
      <div className={`header-icon-${icon}__circle`}>
        <span className="header__icon-text">{cartsNumber}</span>
      </div>
    )}
  </div>
);
