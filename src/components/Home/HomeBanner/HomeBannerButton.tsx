type Props = {
  arrow: JSX.Element;
  onClick: () => void;
};

const HomeBannerButton = ({ arrow, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="grid h-banner w-8 place-items-center rounded-full border-1 border-icon"
    >
      {arrow}
    </button>
  );
};

export default HomeBannerButton;
