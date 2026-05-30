import React from 'react';
import './Contacts.scss';

export const Contacts: React.FC = () => {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <div className="contacts">
      <h1 className="contacts__title">React Developer</h1>

      <div className="contacts__container">
        <div className="developer-card">
          <div className="developer-card__image-container">
            {/* ДОДАЛИ СЛЕШ: `${baseUrl}/img/img.png` */}
            <img
              src={`${baseUrl}/img/img.png`}
              alt="Rusnak Vasyl"
              className="developer-card__photo"
            />
          </div>

          <div className="developer-card__info">
            <h3 className="developer-card__name">Rusnak Vasyl</h3>

            <a
              href="https://github.com/VasyaRusnak"
              className="developer-card__github"
              target="_blank"
              rel="noreferrer"
            >
              <span>Github</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
