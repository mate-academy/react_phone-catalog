type Props = {
  arrow: JSX.Element;
};

const HomeBannerButton = ({ arrow }: Props) => {
  return (
    <button className="h-banner grid w-8 place-items-center rounded-full border-1 border-icon">
      {arrow}
    </button>
  );
};

export default HomeBannerButton;
