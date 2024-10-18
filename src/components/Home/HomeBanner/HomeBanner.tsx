import ArrowLeft from "../../../assets/icons/ArrowLeft";
import ArrowRight from "../../../assets/icons/ArrowRight";
import { useAppContext } from "../../../context/AppContext";
import HomeImgSwitch from "../HomeImgSwitch/HomeImgSwitch";
import HomeBannerButton from "./HomeBannerButton";
import HomeBannerScreen from "./HomeBannerScreen";

const HomeBanner = () => {
  const {
    colors,
    handleChangeBannerImage,
    chosenBanner,
    bannerImages,
    homeBannerEl,
  } = useAppContext();
  const { primary } = colors;
  const lastImage = bannerImages.length - 1;

  const handleClickNextImage = () => {
    homeBannerEl.current?.classList.add("duration-300");
    const nextImg = chosenBanner + 1;

    if (nextImg > lastImage) {
      handleChangeBannerImage(nextImg);
      homeBannerEl.current?.addEventListener(
        "transitionend",
        () => {
          homeBannerEl.current?.classList.remove("duration-300");
          handleChangeBannerImage(0);
        },
        { once: true },
      );

      return;
    }

    return handleChangeBannerImage(nextImg);
  };

  const handleClickPrevImage = () => {
    homeBannerEl.current?.classList.add("duration-300");
    const prevImg = chosenBanner - 1;

    if (prevImg < 0) {
      handleChangeBannerImage(prevImg);
      homeBannerEl.current?.addEventListener(
        "transitionend",
        () => {
          homeBannerEl.current?.classList.remove("duration-300");
          handleChangeBannerImage(lastImage);
        },
        { once: true },
      );

      return;
    }

    return handleChangeBannerImage(prevImg);
  };

  return (
    <section className="-mx-[1.5rem] w-[100dvw] small:mx-0 small:w-full">
      <h1 className="mb-14">Welcome to Nice Gadgets store!</h1>
      <section className="mb-2 grid w-full grid-cols-1 gap-4 small:ml-0 small:grid-cols-homeBanner">
        <HomeBannerButton
          onClick={handleClickPrevImage}
          arrow={<ArrowLeft fill={primary} />}
        />
        <HomeBannerScreen />
        <HomeBannerButton
          onClick={handleClickNextImage}
          arrow={<ArrowRight fill={primary} />}
        />
      </section>
      <HomeImgSwitch />
    </section>
  );
};

export default HomeBanner;
