import { Link } from 'react-router-dom';
import { LinkPath } from '../../types/LinkPath';

import './Slide.scss';

const IMG_HEIGHT = 400;
const IMG_WIDTH = 1040;

type Props = {
  linkPath: LinkPath,
  imagePath: string,
};

export const Slide:React.FC<Props> = ({ linkPath, imagePath }) => {
  return (
    <li className="Slide">
      <Link
        to={linkPath}
        className="Slide-Link"
      >
        <img
          className="Slide-Image"
          src={imagePath}
          height={IMG_HEIGHT}
          width={IMG_WIDTH}
          alt="Slider banner"
          loading="lazy"
          decoding="async"
        />
      </Link>
    </li>
  );
};
