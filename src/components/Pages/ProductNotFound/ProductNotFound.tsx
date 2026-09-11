import style from './ProductNotFound.module.scss';
export const ProductNotFound = () => {
  return (
    <>
      <h1 className={style.titlePWNF}>Product was not found</h1>
      <img
        src={`${import.meta.env.BASE_URL}/img/product-not-found.png`}
        alt="Product was not found"
      />
    </>
  );
};
