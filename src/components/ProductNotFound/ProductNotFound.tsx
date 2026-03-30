import style from './ProductNotFound.module.scss';

export const ProductNotFound = () => {
  return (
    <div className={style.notFound}>
      <img
        src="./img/product-not-found.png"
        alt="product-not-found"
        className={style.notFound__img}
      />
      <h2 className={style.notFound__text}>Product was not found</h2>
    </div>
  );
};
