import s from './ProductButtons.module.scss';

export const ProductButtons = () => {
  const inFav = false;

  return (
    <div className={s.productButtons}>
      <button className={s.addToCart} type="button">
        Add to Cart
      </button>
      <button
        className={inFav ? `${s.addToFav} ${s.inFav}` : `${s.addToFav}`}
        type="button"
      />
    </div>
  );
};
