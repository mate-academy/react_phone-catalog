const BurgerMenu = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-between">
      <nav className="px-4 py-6">
        <ul className="flex uppercase items-center font-bold text-gray-400 flex-col gap-4">
          <li>
            <a className="header__is-active" href="">Home</a>
          </li>
          <li>
            <a href="">Phones</a>
          </li>
          <li>
            <a href="">Tablets</a>
          </li>
          <li>
            <a href="">Accessories</a>
          </li>
        </ul>
      </nav>
      <div className="flex w-full">
        <div className="w-full h-16 flex justify-center items-center border border-gray-300">
          <a href="">
            <img
              src="../../../public/img/icons/Shopping bag (Cart).svg"
              alt="cart"
            />
          </a>
        </div>
        <div className="w-full justify-center items-center border border-gray-300 h-16 flex">
          <a href="">
            <img
              src="../../../public/img/icons/Favourites (Heart Like).svg"
              alt="favourites"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;
