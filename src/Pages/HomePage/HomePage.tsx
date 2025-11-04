import { Main } from '../../components/Main/Main';
import style from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div>
      <h1 className={style.visuallyHidden}>Product Catalog</h1>
      <Main />
    </div>
  );
};
