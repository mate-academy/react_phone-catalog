import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

type Props = {
  url: string;
  parentClassName?: string;
};

export const BackButton: React.FC<Props> = ({ url, parentClassName = '' }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate('/' + url)}
      className={classNames('button-back', {
        [`${parentClassName}__button-back`]: parentClassName,
      })}
    >
      <p className="button-back__text small-text">Back</p>
    </div>
  );
};
