import '../../../public/img/page-not-found.png';

export const ErrorNotification = () => {
  return (
    <div className="error-notification">
      <p className="error-notification__title">Page Not Found</p>
      <img src="../../../public/img/page-not-found.png" alt="" />
    </div>
  );
};
