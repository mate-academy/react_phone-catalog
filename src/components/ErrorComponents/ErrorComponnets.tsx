import style from './errorComponents.module.scss';

type Props = {
  onRestart: () => void;
};

export const ErrorComponent: React.FC<Props> = ({ onRestart }) => {
  return (
    <div className={style.wrapper}>
      <span>Oops, something went wrong</span>
      <button onClick={onRestart} className={style.button}>
        Restart Page
      </button>
    </div>
  );
};
