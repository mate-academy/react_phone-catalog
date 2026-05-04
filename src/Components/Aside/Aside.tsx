import { Link } from 'react-router-dom';
import { Footer } from '../Footer/Footer';
import { TopBar } from '../TopBar/TopBar';

const arrowLeft = new URL(
  '../../images/icons/Chevron (Arrow Left).svg',
  import.meta.url,
).href;

export const Aside = () => {
  return (
    <aside className="favourites page__favourites" id="favourites">
      <div className="favourites__top-bar">
        <TopBar cartItemsCount={0} />
      </div>
      <div className="favourites__container">
        <Link to="/Home" className="favourites__back-button">
          <img src={arrowLeft} alt="Arrow Left" />
          <p className="favourites__back-text">Back</p>
        </Link>
        <p className="favourites__title">Cart</p>
      </div>
      <div className="favourites__footer">
        <Footer />
      </div>
    </aside>
  );
};
