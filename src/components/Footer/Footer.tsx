import { Link } from "react-router-dom";

export const Footer = () => {

  const moveTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  return (
    <footer className="mt-20 bg-background-color-base border-color-border border-t px-6 md:px-8 xl:px-[152px]">
      <div className="py-8 flex flex-col sm:flex-row justify-between text-text-color-base-white font-mont text-xs max-w-[1136px]">
        <Link to="/">
          <img
            src="img/Logo2x.svg"
            alt="Logo"
            className="transition-all hover:scale-110 w-20 md:h-7"
          />
        </Link>
        <nav className="flex flex-col pt-8 sm:flex-row sm:pt-0 sm:items-center gap-4 md:gap-[107px] uppercase font-extrabold leading-[11px] tracking-4pct">
          <Link className="translate-transform duration-100 sm:hover:scale-110" to='https://github.com/reelow29/react_phone-catalog'>GitHub</Link>
          <Link className="translate-transform duration-100 sm:hover:scale-110" to=''>Contacts</Link>
          <Link className="translate-transform duration-100 sm:hover:scale-110" to=''>Rights</Link>
        </nav>
        <div className="flex justify-center items-center gap-4 pt-8 sm:pt-0">
          <span 
            className="font-bold text-text-color-base-grey cursor-pointer hover:scale-105"
            onClick={moveTop}
            >
              Back to top
          </span>
          <button 
            className="bg-background-color-btn w-8 h-8 flex justify-center items-center hover:bg-background-color-btn-hover"
            onClick={moveTop}
            >
            <img className="-rotate-90" src="icons/arrow-right.svg" alt="button-top" />
          </button>
        </div>
      </div>
    </footer>
  );
};
