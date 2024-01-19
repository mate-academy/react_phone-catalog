import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

type BackProps = {
  extraClass: string
};

export const Back = ({ extraClass }: BackProps) => {
  const buttonClasses = classNames('back', extraClass);

  const navigate = useNavigate();

  const handleOnCLick = () => navigate(-1);

  return (
    <button
      className={buttonClasses}
      type="button"
      onClick={handleOnCLick}
      data-cy="backButton"
    >
      <img
        className="back__image"
        src="img/arrows/arrow-left.svg"
        alt="Arrow left"
      />

      <p className="back__text">Back</p>
    </button>
  );
};
