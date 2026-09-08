/* eslint-disable max-len */
import s from './PageTop.module.scss';
import HomeIcon from '../../img/icons/icon-home.svg?react';
import ArrowIcon from '../../img/icons/icon-arrow.svg?react';
import { Link } from 'react-router-dom';
import { defaultParams, LINK_TO } from '../../constants';
import { BackTo } from '../BackTo';
import { capitalize } from 'lodash';

type Props = {
  productsLength?: number;
  category?: string;
  productName?: string;
};

export const PageTop: React.FC<Props> = ({
  productsLength,
  category,
  productName,
}) => {
  const lengthProducts = category === 'favorites' ? 'items' : 'models';
  const upperCategory = capitalize(category);

  return (
    <div className={s.PageTop}>
      <div className={s.PageTop__toHome}>
        <Link to={LINK_TO.HOME}>
          <HomeIcon className={s.PageTop__homeIcon} />
        </Link>
        <ArrowIcon className="icon icon--right" />

        <Link
          to={{
            pathname: `/${category}`,
            search: defaultParams,
          }}
          className={s.PageTop__smallLink}
        >
          {upperCategory}
        </Link>

        {productName && (
          <>
            <ArrowIcon className="icon icon--right" />
            <p className={s.PageTop__smallLink}>{productName}</p>
          </>
        )}
      </div>

      {productName && <BackTo />}

      {productName ? (
        <h2 className={s.PageTop__title}>{productName}</h2>
      ) : (
        <h1 className={s.PageTop__title}>{upperCategory}</h1>
      )}

      {!productName && (
        <p
          className={s.PageTop__count}
        >{`${productsLength} ${lengthProducts}`}</p>
      )}
    </div>
  );
};
