import classNames from 'classnames';

import './Slide.scss';

type Props = {
  imgUrl: string;
  alt: string;
  active: boolean;
};

export const Slide: React.FC<Props> = ({ imgUrl, alt, active }) => {
  return (
    <div className={classNames('slide', { active })}>
      <img src={imgUrl} alt={alt} className="slide__img" />
    </div>
  );
};
