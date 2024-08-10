import ArrowLeft from "../../../assets/icons/ArrowLeft";
import ArrowRight from "../../../assets/icons/ArrowRight";
import { useAppContext } from "../../../context/AppContext";
import HomeImgSwitch from "../HomeImgSwitch/HomeImgSwitch";
import HomeBannerButton from "./HomeBannerButton";
import HomeBannerScreen from "./HomeBannerScreen";

const HomeBanner = () => {
  const { colors, handleChangeBannerImage, chosenBanner, bannerImages } =
    useAppContext();
  const { primary } = colors;
  const lastImage = bannerImages.length - 1;

  const handleClickNextImage = () => {
    const nextImg = chosenBanner + 1;

    if (nextImg > lastImage) {
      return handleChangeBannerImage(0);
    }

    return handleChangeBannerImage(nextImg);
  };

  const handleClickPrevImage = () => {
    const prevImg = chosenBanner - 1;

    if (prevImg < 0) {
      return handleChangeBannerImage(lastImage);
    }

    return handleChangeBannerImage(prevImg);
  };

  return (
    <section>
      <h1 className="mb-14 text-h1">Welcome to Nice Gadgets store!</h1>
      <div className="flex flex-row gap-4">
        <HomeBannerButton
          onClick={handleClickPrevImage}
          arrow={<ArrowLeft fill={primary} />}
        />
        <HomeBannerScreen />
        <HomeBannerButton
          onClick={handleClickNextImage}
          arrow={<ArrowRight fill={primary} />}
        />
      </div>
      <HomeImgSwitch />
    </section>
  );
};

export default HomeBanner;
