import { Link } from 'react-router-dom';
import classes from '../Header/Header.module.scss';

export const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="navigation__links"></div>
      <Link to="#" className="navigation__item" data-language="about-us">
        About us
      </Link>
      <Link to="#" className="navigation__item" data-language="services">
        Services
      </Link>
      <Link to="#" className="navigation__item" data-language="testimonials">
        Testimonials
      </Link>
      <Link to="#" className="navigation__item" data-language="contact-us">
        Contact Us
      </Link>
      <div className="navigation__buttons">
        <Link to="/" className={classes.header__action_button}>
          <span className="icon icon--favorite" />
        </Link>
        <Link to="/" className={classes.header__action_button}>
          <span className="icon icon--cart" />
        </Link>
      </div>
    </nav>
  );
};
