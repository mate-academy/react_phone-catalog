import { NavLink } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import './NotFoundPage.scss';

export const NotFoundPage = () => {
  return (
    <div className="NotFoundPage section">
      <h1 className="NotFoundPage__title">
        Page not found
      </h1>
      <img
        src="./notFoundPage.webp"
        alt="Sad cat"
        className="NotFoundPage__image"
      />
      <NavLink to="/">
        <Button
          variant="cart"
          className="NotFoundPage__button"
        >
          Home Page
        </Button>
      </NavLink>
    </div>
  );
};
