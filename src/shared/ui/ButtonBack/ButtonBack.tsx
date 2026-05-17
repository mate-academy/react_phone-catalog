import { useNavigate } from 'react-router-dom';
import style from './ButtonBack.module.scss';
import { Icons } from '../../ui/Icons/Icons';
import { Directions, IconId } from '../../../types/icons';

export const ButtonBack = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <button onClick={goBack} className={style.buttonBack}>
      <div className={style.imgContainer}>
        <Icons
          id={IconId.Chevron}
          directions={Directions.Left}
          className={style.chevron}
        />
        <p className={style.text}>Back</p>
      </div>
    </button>
  );
};
