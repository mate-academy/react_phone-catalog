import './Actions.scss';

export const Actions: React.FC = () => {
  const handleAddToCart = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  const handleAddToFavourites = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  return (
    <div className="Actions">
      <button
        type="button"
        className="Actions__add-to-cart"
        onClick={handleAddToCart}
      >
        Add to cart
      </button>

      <button
        type="button"
        aria-label="Add to favourites"
        className="Actions__add-to-favourites"
        onClick={handleAddToFavourites}
      />
    </div>
  );
};
