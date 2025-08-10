import style from './Loader.module.scss';

export const Loader: React.FC = () => {
  return (
    <div className={style.container}>
      <div className={style.loader}></div>
    </div>
  );
};
