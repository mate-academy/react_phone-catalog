import { Image } from "../../../types/image";

type Props = {
  image: Image;
  size: number;
};

const HomeBannerScreenImage = ({ image, size }: Props) => {
  const { color, src } = image;
  const boxShadowStyle = `inset 0 0 6em 1em ${color}`;

  return (
    <section
      style={{
        maxWidth: `${size}%`,
        backgroundColor: `${color}`,
      }}
      className="grid max-w-full grid-cols-1 grid-rows-2 gap-10 p-4 small:grid-cols-[4fr_5fr] small:grid-rows-1"
    >
      <div className="rounded-2xl bg-[#ffffff5e] p-12">
        <p className="bg-gradient-to-r from-[#800080] to-[#dd9fdd] bg-clip-text text-transparent small:text-h1">
          Now available in our store! <span className="text-primary">👌</span>
        </p>
      </div>
      <div className="relative grid place-items-center">
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
