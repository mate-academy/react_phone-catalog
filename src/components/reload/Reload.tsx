import { useContext } from 'react';
import Styles from './Reload.module.scss';
import { ContextApp } from '../../appContext/AppContext';

export const Reload: React.FC = () => {
  const { setLoadingErr } = useContext(ContextApp);
  const handlerReload = () => {
    window.location.reload();
    setLoadingErr(false);
  };

  return (
    <div className={Styles.reload}>
      <p className={Styles.reload__paragraph}>Something went wrong</p>
      <button className={Styles.reload__button} onClick={handlerReload}>
        🔄
      </button>
    </div>
  );
};
