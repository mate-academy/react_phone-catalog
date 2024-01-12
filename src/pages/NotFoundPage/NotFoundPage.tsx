import { ICONS } from '../../icons';
import './NotFoundPage.scss';

export const NotFoundPage = () => {
  return (
    <div className="container">
      <img 
        src={ICONS.workInProgress} 
        alt='Work in progress'
        className="container__image"
      />
    </div>
  );
};
