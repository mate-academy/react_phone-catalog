import { useAppContext } from "../../../context/AppContext";

const HomeImgSwitch = () => {
  const { bannerImages, chosenBanner, handleChangeBannerImage } =
    useAppContext();

  let currentNum = chosenBanner;
  if (chosenBanner < 0) {
    currentNum = bannerImages.length - 1;
  }
  if (chosenBanner > bannerImages.length - 1) {
    currentNum = 0;
  }

  return (
    <section className="flex flex-row justify-center gap-1">
      {bannerImages.map((switcher) => (
        <button
          key={switcher.id}
          onClick={() => handleChangeBannerImage(switcher.id)}
          className="grid size-6 place-items-center"
        >
          <div
            className={`h-1 w-4 duration-300 ${switcher.id === currentNum ? "bg-primary" : "bg-elem"}`}
          ></div>
        </button>
      ))}
    </section>
  );
};

export default HomeImgSwitch;
