import s from './ModelPagination.module.scss';
import cl from 'classnames';
import ArrowIcon from '../../../img/icons/icon-arrow.svg?react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '../../Button';

type Props = {
  productLength: number;
  perPage: number;
  page: number;
};

export const ModelPagination: React.FC<Props> = ({
  productLength,
  page,
  perPage,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const buttonsCount = Array.from(
    { length: Math.ceil(productLength / perPage) },
    (_, i) => i + 1,
  );

  const handleChangeSearch = async (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set(key, value);
    setSearchParams(params, { replace: true });
  };

  const handleChangePage = (str: 'left' | 'right') => {
    if (str === 'left') {
      handleChangeSearch('page', String(page - 1));
    } else {
      handleChangeSearch('page', String(page + 1));
    }
  };

  return (
    <div className={s.ModelPagination}>
      <Button
        IconProp={ArrowIcon}
        disabled={page === 1}
        onClick={() => handleChangePage('left')}
        className="icon--left"
      />
      {buttonsCount.map((e, i) => (
        <button
          onClick={() => handleChangeSearch('page', String(e))}
          className={cl(s.ModelPagination__button, {
            [s.ModelPagination__buttonActive]: page === +e,
          })}
          key={i}
        >
          {e + ''}
        </button>
      ))}
      <Button
        IconProp={ArrowIcon}
        disabled={page === buttonsCount.length}
        onClick={() => handleChangePage('right')}
        className="icon--right"
      />
    </div>
  );
};
