import { BannerImgs } from '../../../types/BannerImgs';

interface Props {
  img: BannerImgs;
}

export const BannerImg: React.FC<Props> = ({ img }) => (
  <div className="banner__imgs">
    <picture>
      <img
        className="banner__img"
        src={img.path}
        alt="banner-img"
        loading="lazy"
      />
    </picture>
  </div>
);
