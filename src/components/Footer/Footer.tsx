import { FC } from 'react'
import { Link } from 'react-router-dom'
import './footer.scss';

const links = [
  {
    name: 'Github',
    to: 'https://github.com/bojkovladislav',
  },
  {
    name: 'Contacts',
    to: '/',
  },
  {
    name: 'Rights',
    to: '/',
  },
];

export const Footer: FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className='footer__wrapper'>
      <Link to="/" className="footer__logo logo">
        <img src="../../public/_new/img/icons/LOGO.svg" alt="Logo" />
      </Link>

      <ul className='footer__nav-list'>
        {links.map(({ name, to }) => (
          <li 
            className='footer__nav-item'
            key={name}
          >
            <Link to={to} className="footer__nav-link">
              {name}
            </Link>
          </li>
        ))}
      </ul>

      <div className='footer__back-to-top-wrapper'>
        <p className='footer__back-to-top-text'>
          Back to top
        </p>
        <button className='footer__back-to-top-button' onClick={scrollToTop}>
          <img 
            src="../../../public/_new/img/icons/back-to-top.svg" alt="Back to top button" 
          />
        </button>
      </div>
    </footer>
  )
}
