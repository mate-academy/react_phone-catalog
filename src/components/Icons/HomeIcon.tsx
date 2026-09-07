import style from './Icons.module.scss';

export const HomeIcon: React.FC = () => {
  return (
    <div className={style.icon}>
      <span className={style.icon__home}></span>
    </div>
  );
};
