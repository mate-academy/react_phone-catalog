import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import left from '../../../../assets/images/icons/arrow-left.svg';
import s from './GoBackLink.module.scss';

export const GoBackLink: FC = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className={s.backLink} onClick={goBack}>
      <img src={left} alt="icon left" className={s.iconLeft} />
      <span>Back</span>
    </div>
  );
};
