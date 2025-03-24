import { Link } from 'react-router-dom';
import s from './CurrentPage.module.scss';
import { LINK_TO } from '../../constants';
import { BackTo } from '../BackTo';

type Props = {
  productsLength?: number;
  category?: string;
  productName?: string;
};

export const CurrentPage: React.FC<Props> = ({
  productsLength,
  category,
  productName,
}) => {
  const upperCategory =
    category?.slice(0, 1).toUpperCase() + category?.slice(1);
  const lengthProducts = category === 'favorites' ? 'items' : 'models';

  return (
    <div className={s.CurrentPage}>
      <div className={s.CurrentPage__toHome}>
        <Link to={LINK_TO.HOME}>
          <img src="img/icons/icon-home.svg" alt="icon-home" />
        </Link>
        <div className="">
          <img src="img/icons/icon-arrowRightGray.svg" alt="icon-arrow-right" />
        </div>
        <Link to={`/${category}`} className={s.CurrentPage__smallLink}>
          {upperCategory}
        </Link>

        {productName && (
          <>
            <div className="">
              <img
                src="img/icons/icon-arrowRightGray.svg"
                alt="icon-arrow-right"
              />
            </div>
            <p className={s.CurrentPage__smallLink}>{productName}</p>
          </>
        )}
      </div>

      {productName && <BackTo />}

      {productName ? (
        <h2 className={s.CurrentPage__title}>{productName}</h2>
      ) : (
        <h1 className={s.CurrentPage__title}>{upperCategory}</h1>
      )}

      {!productName && (
        <p
          className={s.CurrentPage__count}
        >{`${productsLength} ${lengthProducts}`}</p>
      )}
    </div>
  );
};
