import cls from './loader.module.scss';

export const Loader = () => {
  return (
    <div className={cls.wrapper}>
      <div className={cls['lds-dual-ring']}></div>
    </div>
  );
};
