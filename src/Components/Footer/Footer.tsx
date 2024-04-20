// import { NavLink } from 'react-router-dom';
import { GridContainer } from '../GridContainer/GridContainer';
import './Footer.scss';

export const Footer = () => {
  const topFunction = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  return (
    <div className="footer-container">
      <GridContainer>
        <div className="footer-content">
          <div className="footer-logo">
            <img src="img/Logo.png" alt="" className="logo-img" />
          </div>
          <div className="footer-link">
            <a href="#">GITHUB</a> {/*NavLink */}
            <a href="#">CONTACTS</a>
            <a href="#">RIGHTS</a>
          </div>
          <div className="footer-back-to-top">
            <h1 className="footer-btn-title">Back to top </h1>
            <button className="footer-btn" onClick={topFunction}>
              {`>`}
            </button>
          </div>
        </div>
      </GridContainer>
    </div>
  );
};
