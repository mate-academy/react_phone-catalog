import React from "react";
import {ScrollButton} from "../ScrollButton/ScrollButton";

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__top">
            <div className="fotter__about-me">
              <h3 className="footer__about-me__title">Contact Me</h3>

              <ul className="footer__about-me__list">
                <li className="footer__about-me__item">
                  <a
                    className="footer__about-me__link"
                    href="https://www.instagram.com/diamorphiin/"
                    target="_blank"
                  >
                    <img
                      className="footer__about-me__img"
                      src={"/img/footer/insta.png"}
                      alt="instagram"
                    />
                  </a>
                </li>

                <li className="footer__about-me__item">
                  <a
                    className="footer__about-me__link"
                    href="mailto:shyrii11bohdan@gmail.com"
                  >
                    <img
                      className="footer__about-me__img"
                      src="img/footer/gmaill.png"
                      alt="gmail"
                    />
                  </a>
                </li>

                <li className="footer__about-me__item">
                  <a
                    className="footer__about-me__link"
                    href="https://github.com/true-binar-White-Rabbit"
                    target="_blank"
                  >
                    <img
                      className="footer__about-me__img"
                      src="img/footer/github.png"
                      alt="github"
                    />
                  </a>
                </li>

                <li className="footer__about-me__item">
                  <a
                    className="footer__about-me__link"
                    href="https://www.linkedin.com/in/bohdan-shyrii-0915002b8/"
                    target="_blank"
                  >
                    <img
                      className="footer__about-me__img"
                      src="img/footer/linked.png"
                      alt="gmail"
                    />
                  </a>
                </li>
              </ul>
            </div>
            <ScrollButton />
          </div>

          <div className="footer__bottom">
            <div className="footer__accepted-pay">
              <p className="footer__accepted-pay-text">Accepted payments</p>
              <ul className="footer__accepted-pay__list">
                <li className="footer__accepted-pay__list__item">
                  <img
                    className="footer__accepted-pay__list__img"
                    src={"/img/footer/app.png"}
                    alt="apple pay"
                  />
                </li>

                <li className="footer__accepted-pay__list__item">
                  <img
                    className="footer__accepted-pay__list__img"
                    src="img/footer/master.png"
                    alt="mastercard"
                  />
                </li>

                <li className="footer__accepted-pay__list__item">
                  <img
                    className="footer__accepted-pay__list__img"
                    src="img/footer/visa.png"
                    alt="visa"
                  />
                </li>

                <li className="footer__accepted-pay__list__item">
                  <img
                    className="footer__accepted-pay__list__img"
                    src="img/footer/pal.png"
                    alt="paypal"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__copyright">
        <div className="container">
          <p className="footer__copyright__text">© 2024</p>
        </div>
      </div>
    </footer>
  );
};
