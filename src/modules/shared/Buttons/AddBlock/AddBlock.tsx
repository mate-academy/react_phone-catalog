import { IconFavourites } from '../../IconsSVG';

export const AddBlock = () => {
  return (
    <div className="add-block">
      <div className="add-block__add-to-cart">Add to cart</div>
      <div className="add-block__add-to-fav">
        <IconFavourites />
      </div>
    </div>
  );
};
