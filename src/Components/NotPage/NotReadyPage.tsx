import '../PhonePage/PhonesPage.scss';
import '../../App.scss';
import { BackLink } from '../BackLink/BackLink';

export const NotReadyPage = () => {
  return (
    <div className="page">
      <BackLink text="Page" />
      <h1 className="phones__title">Page is not created</h1>
    </div>
  );
};
