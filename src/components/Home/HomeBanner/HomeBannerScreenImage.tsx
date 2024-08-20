import { Image } from "../../../types/image";

type Props = {
  image: Image;
  size: number;
};

const HomeBannerScreenImage = ({ image, size }: Props) => {
  const { color, src } = image;

  return (
    <>
      <img
        src={src}
        alt=""
        className="h-full"
        style={{
          width: `${size}%`,
          backgroundColor: `${color}`,
        }}
      />
    </>
  );
};

export default HomeBannerScreenImage;
