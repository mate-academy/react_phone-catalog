import './EmptyNotification.scss';

export const EmptyNotification = () => {
  return (
    <div className="container error">
      <div className="emptyNotificataion__wrap">
        <p
          className="emptyNotificataion__text"
        >
          Right now we do not have any products in the database
        </p>
        <div className="emptyNotificataion__img" />
      </div>
    </div>
  );
};
