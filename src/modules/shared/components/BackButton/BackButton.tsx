import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowLeftIcon from '../../../../assets/icons/arrow-left.svg?react';
import styles from './BackButton.module.scss';

interface Props {
  className?: string;
}

export const BackButton = ({ className }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    if (location.key === 'default') {
      navigate('/');
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      type="button"
      className={classNames(styles.backButton, className)}
      onClick={goBack}
    >
      <ArrowLeftIcon />
      Back
    </button>
  );
};
