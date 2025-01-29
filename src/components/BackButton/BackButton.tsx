import { useNavigate } from 'react-router-dom';
import style from './BackButton.module.scss';
import { ArrowLeftIcon } from '../Icons/ArrowLeftIcon';
import classNames from 'classnames';

interface Props {
  className?: string;
}

export const BackButton: React.FC<Props> = ({ className }) => {
  const navigate = useNavigate();

  return (
    <button
      className={classNames(style.back_button, { className })}
      onClick={() => navigate(-1)}
    >
      <ArrowLeftIcon active={true} />
      <span className={style.back_button__title}>Back</span>
    </button>
  );
};
