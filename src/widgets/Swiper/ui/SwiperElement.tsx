import { Link } from 'react-router-dom';
import { SwiperData } from '../types/swipe';

type Props = {
  SwiperLink: SwiperData;
  lazy: boolean;
};

export const SwiperElement: React.FC<Props> = ({ SwiperLink, lazy }) => {
  const { src, alt, href } = SwiperLink;

  return (
    <Link to={href} className={'swiperLink'}>
      <img
        className={'swiperLink__image'}
        src={src}
        alt={alt}
        loading={lazy ? 'eager' : 'lazy'}
      />
    </Link>
  );
};
