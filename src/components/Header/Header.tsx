import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="background-color-base sticky">
      <div
        className="container
        mx-auto flex
        items-center justify-between
        px-6 py-5"
      >
        <Link to="/">
          <img
            src="img/Logo.png"
            alt="Logo"
            className="h-7 w-20"
          />
        </Link>
        <nav className="flex space-x-6">
          <Link
            to="/"
            className="text-xs font-extrabold uppercase leading-[11px]"
          >
            Homeeeeeeeeeee
          </Link>
          <Link
            to="/phones"
            className="text-xs font-extrabold uppercase leading-[11px]"
          >
            Phones
          </Link>
          <Link
            to="/tablets"
            className="text-xs font-extrabold uppercase leading-[11px]"
          >
            tablets
          </Link>
          <Link
            to="/accessories"
            className="text-xs font-extrabold uppercase leading-[11px]"
          >
            accessories
          </Link>
        </nav>
        <div className="flex">
          <Link
            to="/favorites"
            className="text-gray-700 hover:text-red-500"
          ></Link>
          <Link
            to="/cart"
            className="text-gray-700 hover:text-green-500"
          ></Link>
        </div>
      </div>
    </header>
  );
};
