import cn from 'classnames';
import './Footer.scss';
import { NavLink } from 'react-router-dom';

type Props = {
  isPageBiggerThanWindow: boolean,
};

const ButtonToTopClassName = (isPageBiggerThanWindow: boolean) => cn(
  'button-go-up',
  { 'button-go-up--disabled': !isPageBiggerThanWindow },
);

export const Footer:React.FC<Props> = ({ isPageBiggerThanWindow }) => {
  return (
    <div className="footer container__footer">
      <div className="footer--container">
        <NavLink
          to="/"
        >
          <img
            className="navigation-links__img"
            src="./img/icons/logo.svg"
            alt="#logo"
          />
        </NavLink>
        <div>
          <ul className="navigation-links__links">
            <li className="navigation-links__link">
              <a
                className="link"
                href="https://github.com/Luk2asz/react_phone-catalog"
              >
                GITHUB
              </a>
            </li>
            <li className="navigation-links__link">
              <a className="link" href="#contacts">CONTACTS</a>
            </li>
            <li className="navigation-links__link">
              <a className="link" href="#rights">RIGHTS</a>
            </li>
          </ul>
        </div>

        <div
          className="back-to-top"
          style={isPageBiggerThanWindow ? { opacity: 1 } : { opacity: 0 }}
        >
          <span
            className="navigation-links__link navigation-links__link--back"
          >
            Back to top
          </span>
          <button
            className={ButtonToTopClassName(isPageBiggerThanWindow)}
            type="button"
            disabled={!isPageBiggerThanWindow}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <img
              className="img"
              src="./img/icons/arrowup.svg"
              alt="#home"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
