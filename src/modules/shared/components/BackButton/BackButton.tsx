import { useNavigate } from 'react-router-dom';
import arrowLeft from '../../assets/icons/arrow-left.svg';
import styles from './BackButton.module.scss';

type Props = {
  // куда вести; без него — шаг назад по истории, как кнопка браузера
  to?: string;
};

export const BackButton = ({ to }: Props) => {
  const navigate = useNavigate();

  const goBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button type="button" className={styles.back} onClick={goBack}>
      <img src={arrowLeft} alt="" />
      Back
    </button>
  );
};
