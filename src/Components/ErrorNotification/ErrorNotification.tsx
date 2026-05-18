import { getImagePath } from '../../utils/paths';

export const ErrorNotification = () => {
  return (
    <div className="error-notification">
      <p className="error-notification__title">Page Not Found</p>
      <img src={getImagePath('img/page-not-found.png')} alt="" />
    </div>
  );
};
