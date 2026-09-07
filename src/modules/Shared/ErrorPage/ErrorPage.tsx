import style from './Error.module.scss'

interface ErrorPageProps {
  onReload: () => void;
};

export const ErrorPage = ({ onReload }: ErrorPageProps) => {
  return (
    <div className={style.error}>
      <h1 className={style.error__message}>Something went wrong...</h1>
      <button
      className={style.error__button}
      onClick={onReload}
      >Reload</button>
    </div>
  );
}