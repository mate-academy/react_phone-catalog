type Props = {
  icon: string;
  to: string;
};

const HeaderButton = ({ icon, to }: Props) => {
  return (
    <button className="size-auto border-elem border-l-1">
      <img src={icon} alt={to} className="aspect-square m-6" />
    </button>
  );
};

export default HeaderButton;
