import s from './Footer.module.scss';

export const Footer: React.FC = () => {
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className={s.root}>
      <div className={`container ${s.inner}`}>
        <a
          href="https://github.com/mersy-28/react_phone-catalog"
          target="_blank"
          rel="noreferrer"
        >
          GitHub Repo
        </a>

        <button className="backToTop" onClick={toTop}>
          Back to top ⤴
        </button>
      </div>
    </footer>
  );
};
