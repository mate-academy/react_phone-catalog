type Props = {
  path: string,
  alt: string,
  bannerWidth: number,
  bannerGap: number,
};

export const CarouselBanner:React.FC<Props> = ({
  path,
  alt,
  bannerWidth,
  bannerGap,
}) => (
  <div
    style={{
      width: `${bannerWidth}px`,
      marginRight: `${bannerGap}px`,
    }}
    className="carousel__image-container"
  >
    <img
      src={path}
      alt={alt}
      className="carousel__image"
    />
  </div>
);
