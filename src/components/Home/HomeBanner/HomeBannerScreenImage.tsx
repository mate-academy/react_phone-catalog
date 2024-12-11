import { NavLink } from "react-router-dom";
import useWindowSize from "../../../hooks/useWindowSize.hook";
import { BannerImage } from "../../../types/bannerImage";

type Props = {
  image: BannerImage;
  size: number;
  index: number;
};

const HomeBannerScreenImage = ({ image, size, index }: Props) => {
  const { color, src, title, paragraph, to } = image;
  const boxShadowStyle = `inset 0 0 6rem 1rem ${color}`;
  const isOddPlate = index % 2 !== 0;
  const { width } = useWindowSize();
  const isScreenSmall = width > 640;

  return (
    <section
      style={{
        width: `${size}%`,
        backgroundColor: `${color}`,
      }}
      className="grid grid-cols-1 grid-rows-2 small:grid-cols-[4fr_5fr] small:grid-rows-1"
    >
      <div
        className={`m-3 box-border flex flex-col justify-between rounded-2xl ${!isScreenSmall && "items-center"} ${isScreenSmall && "bg-plate"} p-4 desktop:m-6 desktop:p-8 ${isOddPlate && !isScreenSmall && "items-end"}`}
      >
        <article
          className={`${isOddPlate && "text-right"} ${!isScreenSmall && "text-center"}`}
        >
          <p className="bg-gradient-to-r from-[#800080] to-[#dd9fdd] bg-clip-text text-bannerTextTitleSmall text-transparent desktop:text-bannerTextTitle">
            {title} <span className="text-primary">👌</span>
          </p>
          <p
            className={`text-bodyText text-sec ${!isScreenSmall && "text-center"}`}
          >
            {paragraph}
          </p>
        </article>
        {isScreenSmall && (
          <button className="w-fit rounded-full border-1 border-sec px-8 py-3 text-bannerTextButton uppercase text-sec">
            <NavLink to={to}>order now</NavLink>
          </button>
        )}
      </div>
      <div
        className={`relative box-border grid place-items-center ${isOddPlate && "row-start-1"}`}
      >
        <div
          className="absolute h-full w-full"
          style={{ boxShadow: boxShadowStyle }}
        ></div>
        <img src={src} alt="" className="h-full w-full object-contain" />
      </div>
    </section>
  );
};

export default HomeBannerScreenImage;
