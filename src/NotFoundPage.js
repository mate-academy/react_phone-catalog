import React from 'react';

const NotFoundPage = () => (
  <div>
    <div className="container">
      <div className="row">
        <div id="notfound">
          <div className="notfound-bg" />
          <div className="notfound">
            <div className="notfound-404">
              <h1>404</h1>
            </div>
            <h2>we are sorry, but the page you requested was not found</h2>
            <a
              href="#"
              className="home-btn"
            >
            Go Home
            </a>
            <div className="notfound-social">
              <a
                rel="noopener noreferrer"
                href="https://www.facebook.com/djkamry"
                target="_blank"
              >
                <i className="fab fa-facebook-f" />
              </a>
              <a
                rel="noopener noreferrer"
                href="https://github.com/djkamry22"
                target="_blank"
              >
                <i className="fab fa-github" />
              </a>
              <a
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/djkamry/"
                target="_blank"
              >
                <i className="fab fa-linkedin-in" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default NotFoundPage;
