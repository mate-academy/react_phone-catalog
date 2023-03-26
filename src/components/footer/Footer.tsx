import './footer.scss';
/* eslint-disable jsx-a11y/anchor-is-valid */

export const Footer = () => {
  const backTop = () => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <img src="./img/phones/LOGO.png" alt="logo" />
      <div className="footer__links">
        <a href="#">GITHUB</a>
        <a href="#">CONTACTS</a>
        <a href="#">RIGHTS</a>
      </div>
      <div className="footer__back-top">
        <span>Back to top</span>
        <button type="button" onClick={backTop}>
          <img src="./img/icons/Left.png" alt="top" />
        </button>
      </div>
    </footer>
  );
};
