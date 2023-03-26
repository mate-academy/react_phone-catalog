import { FC } from 'react';
import classNames from 'classnames';

type Props = {
  activeBanner: number;
  image: string;
  index: number;
};

export const ImageBanner: FC<Props> = ({ activeBanner, image, index }) => {
  return (
    <img
      src={`${process.env.PUBLIC_URL}${image}`}
      alt=""
      className={classNames(
        'banner__img',
        { 'banner__img--active': activeBanner === index },
      )}
    />
  );
};
