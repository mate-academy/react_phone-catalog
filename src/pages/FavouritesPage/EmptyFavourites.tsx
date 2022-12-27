import { GoBack } from 'src/components/GoBack';

export const EmptyFavourites = () => {
  return (
    <div className="empty-favourites">
      <GoBack />

      <div className="empty-favourites__title-wrapper">
        <h2 className="title">
          Nothing here :( go back shoping!
        </h2>
      </div>
    </div>
  );
};
