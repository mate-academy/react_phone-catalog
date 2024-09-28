import { useAppContext } from "../../../context/AppContext";
import HomeBannerScreenImage from "./HomeBannerScreenImage";

const HomeBannerScreen = () => {
  const { bannerImages, chosenBanner, homeBannerEl } = useAppContext();
  const bannerImagesCount = bannerImages.length;
  const lastImage = bannerImagesCount - 1;
  const bannerSectionSize = (bannerImagesCount + 2) * 100;
  const bannerImageSize = 100 / (bannerImagesCount + 2);

  return (
    <div className="h-bannerMd w-full overflow-hidden rounded-lg desktop:desktop:h-banner">
      <section
        ref={homeBannerEl}
        style={{
          width: `${bannerSectionSize}%`,
          transform: `translateX(-${bannerImageSize * (chosenBanner + 1)}%)`,
        }}
        className="flex h-full flex-row duration-300 ease-in"
      >
        <HomeBannerScreenImage
          image={bannerImages[lastImage]}
          size={bannerImageSize}
        />
        {bannerImages.map((image) => (
          <HomeBannerScreenImage
            key={image.id}
            image={image}
            size={bannerImageSize}
          />
        ))}
        <HomeBannerScreenImage image={bannerImages[0]} size={bannerImageSize} />
      </section>
    </div>
  );
};

export default HomeBannerScreen;
