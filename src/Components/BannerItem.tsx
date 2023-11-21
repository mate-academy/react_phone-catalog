/* eslint-disable max-len */
import classNames from 'classnames';
import { Link } from 'react-router-dom';

type Props = {
  disabled?: boolean;
  to: string;
  src: string;
};

export const BannerItem: React.FC<Props> = ({ disabled, to, src }) => {
  return (
    <Link
      className={classNames(
        'carousel-image block h-[400px] w-[1040px] shrink-0 object-cover',
        {
          'hover:cursor-not-allowed': disabled,
        },
      )}
      to={to}
      onClick={e => {
        if (disabled) {
          e.preventDefault();
        }
      }}
    >
      <img
        className="h-[400px] w-[1040px] object-cover"
        src={src}
        alt="phones"
      />
    </Link>
  );
};
