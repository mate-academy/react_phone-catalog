import './Logo.scss';

export const Logo = () => {
  return (
    <div className="logo">
      <a href="/" className="logo__link">
        <img
          src="./img/Logo.png"
          alt="Nice Gadgets Logo"
          className="logo__image"
        />
      </a>
    </div>
  );
};
