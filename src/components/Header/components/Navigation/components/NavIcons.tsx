import { Link } from 'react-router-dom';
type Props = {
  className: string;
};

export const NavIcons: React.FC<Props> = ({ className }) => {
  return (
    <>
      <div className={`${className}__icons nav__icons`}>
        <Link
          to="favourites"
          className={`nav__icon ${className}__icon  nav--item`}
        >
          <div className="icon icon--fav"></div>
        </Link>
        <Link to="cart" className={`${className}__icon nav__icon nav--item`}>
          <div className="icon icon--cart"></div>
        </Link>
      </div>
    </>
  );
};
