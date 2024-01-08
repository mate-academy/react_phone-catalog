/* eslint-disable max-len */
import { Link } from 'react-router-dom';

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export const Footer: React.FC = () => {
  return (
    <footer className="absolute h-[100px] bottom-0 w-full">
      <div
        className="flex items-center max-w-[1136px] mx-auto h-full justify-between"
      >
        <Link to="/" onClick={scrollToTop}>
          <img src="./img/svg/logo.svg" alt="logo" />
        </Link>

        <div className="flex gap-x-16">
          <a
            href="https://github.com/victor-buldenko"
            target="_blank"
            rel="noreferrer"
            className="h3 text-secondary uppercase hover:text-primary"
          >
            Github
          </a>
          <a
            href="mailto: ookidoowow@gmail.com"
            target="_blank"
            rel="noreferrer"
            className="h3 text-secondary uppercase hover:text-primary"
          >
            Contacts
          </a>

          <a
            href="https://github.com/victor-buldenko"
            target="_blank"
            rel="noreferrer"
            className="h3 text-secondary uppercase hover:text-primary"
          >
            rights
          </a>
        </div>
        <div className="w-10" />
      </div>
    </footer>
  );
};
