import ArrowLeft from "../../../assets/icons/ArrowLeft";
import ArrowRight from "../../../assets/icons/ArrowRight";
import { useAppContext } from "../../../context/AppContext";
import HomeBannerButton from "./HomeBannerButton";
import HomeBannerScreen from "./HomeBannerScreen";

const HomeBanner = () => {
  const { colors } = useAppContext();
  const { primary } = colors;

  return (
    <section className="flex flex-row gap-4">
      <HomeBannerButton arrow={<ArrowLeft fill={primary} />} />
      <HomeBannerScreen />
      <HomeBannerButton arrow={<ArrowRight fill={primary} />} />
    </section>
  );
};

export default HomeBanner;
