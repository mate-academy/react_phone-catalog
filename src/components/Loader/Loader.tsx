import s from './Loader.module.scss';
export const Loader = () => {
  return (
    <div className={s.Loader}>
      <div className={s.Loader__circle}></div>
    </div>
  );
};
