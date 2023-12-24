import cn from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import './HistoryButton.scss';
import { memo } from 'react';

type Props = {
  text: string;
  path?: string;
};

export const HistoryButton: React.FC<Props> = memo(({ text, path }) => {
  const navigate = useNavigate();

  return (
    <Link
      data-cy="backButton"
      to={path || ''}
      onClick={() => !path && navigate(-1)}
      className="link"
    >
      <img
        src={path ? 'icons/arrow-right-grey.svg' : 'icons/arrow-left.svg'}
        alt="arrow"
        className={cn('link-image', { back: !path })}
      />
      <p className="link-text">{text}</p>
    </Link>
  );
});
