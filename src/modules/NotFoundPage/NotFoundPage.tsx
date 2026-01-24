import style from './NotFoundPage.module.scss';

type Props = {
  type?: 'product';
};

export const NotFoundPage: React.FC<Props> = ({ type }) => {
  const isProduct = type === 'product';

  return (
    <div className={style['not-found']}>
      <div className="container">
        <div className={style['not-found__container']}>
          {isProduct ? (
            <img
              src="/img/product-not-found.png"
              alt="Product not found"
              className={style['not-found__img']}
            />
          ) : (
            <img
              src="/img/page-not-found.png"
              alt="Page not found"
              className={style['not-found__img']}
            />
          )}
        </div>
      </div>
    </div>
  );
};
