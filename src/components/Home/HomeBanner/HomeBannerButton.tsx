type Props = {
  arrow: JSX.Element;
  onClick: () => void;
};

const HomeBannerButton = ({ arrow, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="h-bannerMedium grid w-8 place-items-center rounded-full border-1 border-icon desktop:h-banner"
    >
      {arrow}
    </button>
  );
};

export default HomeBannerButton;
