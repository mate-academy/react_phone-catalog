import { Link } from 'react-router-dom';

import style from './productsEmpty.module.scss';
import { useTranslation } from 'react-i18next';

type Props = {
  title: string;
};

export const ProductsEmpty: React.FC<Props> = ({ title }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={style.wrapper}>
        <h2 className={`title ${style.title}`}>
          {title} {t('page.isEmpty')}
        </h2>
        <img className={style.img} src={'./img/cart-is-empty.png'} alt="" />
        <div className={style.button}>
          <Link to={'/'} className={style.link}>
            {t('page.BacktoHome')}
          </Link>
        </div>
      </div>
    </>
  );
};
