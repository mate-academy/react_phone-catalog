import { useNavigate } from 'react-router-dom';
import style from './BackButton.module.scss';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button className={style.back} onClick={() => navigate(-1)}>
      <img src="./img/icons/arrow-left.svg" alt="Arrow" />
      Back
    </button>
  );
};

export default BackButton;
