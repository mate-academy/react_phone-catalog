import { FC } from 'react';
import classNames from 'classnames';

type Props = {
  activeBanner: number;
  setActiveBanner: (activeBanner: number) => void;
  index: number;
};

export const ButtonBannerPagination: FC<Props> = ({
  activeBanner,
  setActiveBanner,
  index,
}) => (
  <button
    type="button"
    aria-label="banner"
    className={classNames(
      'banner__pagination-item',
      { 'banner__pagination-item--active': activeBanner === index },
    )}
    onClick={() => setActiveBanner(index)}
  />
);
