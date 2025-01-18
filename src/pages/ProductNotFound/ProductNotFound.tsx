import style from './ProductNotFound.module.scss';

export const ProductNotFound = () => {
  return (
    <>
      <section className={style.notFound}>
        <h1>Product not found</h1>
        <img
          className={style.notFound__image}
          src="src\pages\ProductNotFound\assets\product-not-found.png"
          alt="Product not found image"
        />
      </section>
    </>
  );
};
