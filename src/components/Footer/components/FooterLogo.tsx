import { Link } from 'react-router-dom';
import {
  FooterRoute,
  LOGO_PATH,
  LOGO_ALT_TEXT,
} from '../constants/footerConstants';

interface FooterLogoProps {
  className?: string;
  imageClassName?: string;
}

export const FooterLogo = ({ className, imageClassName }: FooterLogoProps) => (
  <Link
    to={FooterRoute.Home}
    className={className}
  >
    <img
      src={LOGO_PATH}
      alt={LOGO_ALT_TEXT}
      className={imageClassName}
    />
  </Link>
);
