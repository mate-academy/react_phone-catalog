import { Link } from 'react-router-dom';
import './ForthcomingPage.scss';
import { forthcomingPageImage } from '../../helpers/constants';
import { ButtonMain } from '../../components/ButtonMain';

export const ForthcomingPage = () => {
  return (
    <div className="forthcoming">
      <h1 className="forthcoming__title title">Comming Soon</h1>

      <img src={forthcomingPageImage} alt="" className="forthcoming__image" />

      <Link to="/" className="forthcoming__link">
        <ButtonMain text="Back to Home" />
      </Link>
    </div>
  );
};
