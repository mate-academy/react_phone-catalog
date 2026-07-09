import Logo from '../ui/Logo';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className="border gap-8 sm:gap-0 border-gray-400 m-0
      sm:px-[152px] py-8 flex flex-col sm:flex-row justify-around"
    >
      <Logo />
      <nav
        className="w-96 flex px-4 sm:px-0 flex-col
       text-gray-500 justify-center"
      >
        <ul
          className="flex flex-col gap-4 sm:gap-0 sm:flex-row
         text-sm uppercase justify-evenly"
        >
          <li>
            <a href="https://github.com/vexsmart">Github</a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/vitor-freitas-ribeiro/">
              Contacts
            </a>
          </li>
          <li>
            <a href="">Rights</a>
          </li>
        </ul>
      </nav>

      <div className="flex flex-col justify-center">
        <div
          className="flex items-center text-center justify-center
         sm:justify-normal gap-4"
        >
          <p className="text-gray-500  text-sm ">Back to top</p>
          <button
            onClick={scrollToTop}
            className="flex justify-center items-center
            size-8 border border-gray-400"
          >
            <img src="/img/icons/Vector (Stroke).svg" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
