import { GoBack } from 'src/components/GoBack';

export const EmptyCartPage = () => {
  return (
    <div className="empty-favourites">
      <GoBack />

      <div className="empty-favourites__title-wrapper">
        <h2 className="title">
          Your cart is empty :( go back shoping!
        </h2>
      </div>
    </div>
  );
};
