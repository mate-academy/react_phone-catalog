import './BurgerFooter.scss';
import { Link } from 'react-router-dom';

const BurgerFooter = () => {
  return (
    <footer className="burger-footer">
      <div className="burger-footer--heart">
        <Link to="/heart" className="burger-footer__icon--heart"></Link>
      </div>
      <div className="burger-footer--basket">
        <Link to="/basket" className="burger-footer__icon--basket"></Link>
      </div>
    </footer>
  );
};

export default BurgerFooter;
