import React from 'react';

const Footer = () => (
  <footer className="page-footer">
    <div className="container">
      <div className="row">
        <div className="col l6 s12">
          <h5 className="white-text">Phones Catalog</h5>
          <a><i className="small fab fa-linkedin" /></a>
          <a><i className="small fab fa-github" /></a>
          <a><i className="small fab fa-facebook-square" /></a>

        </div>
        <div className="col l4 offset-l2 s12">
          <h5 className="white-text">My Projects</h5>
          <ul>
            <li>
              <a
                className="grey-text text-lighten-3"
                target="_blank"
                href="https://djkamry22.github.io/react_todo-app/"
              >
                      Todo App
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="footer-copyright">
      <div className="container">
            © 2019 Copyright M. Kamran
        <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
      </div>
    </div>
  </footer>
);

export default Footer;
