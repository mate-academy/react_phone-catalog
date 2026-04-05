// import Logo from '../../assets/logo.svg';
// import ArrowUp from '../../assets/Icons/Arrow_up.svg';

// import './Footer.scss';
// import { useEffect, useState } from 'react';

// export const Footer = () => {
//   const [isFooterVisible, setIsFooterVisible] = useState(false);

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth',
//     });
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       const isPageScrolled = window.pageYOffset > 0;

//       setIsFooterVisible(isPageScrolled);
//     };

//     window.addEventListener('scroll', handleScroll);

//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <footer className={`footer ${isFooterVisible ? 'show' : ''}`}>
//       <div className="footer__logo">
//         <img src={Logo} alt="footer__logo__img" className="footer__logo__img" />
//       </div>

//       <ul className="footer__nav">
//         <li className="footer__nav__item">Github</li>
//         <li className="footer__nav__item">Contacts</li>
//         <li className="footer__nav__item">Rights</li>
//       </ul>

//       <div className="footer__back-to-top">
//         <p>Back to top</p>
//         <img
//           src={ArrowUp}
//           alt="arrow_up"
//           className="footer__back-to-top__icon"
//           onClick={scrollToTop}
//         />
//       </div>
//     </footer>
//   );
// };

import Logo from '../../assets/logo.svg';
import ArrowUp from '../../assets/Icons/Arrow_up.svg';
import './Footer.scss';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer__logo">
        <img src={Logo} alt="footer__logo__img" className="footer__logo__img" />
      </div>

      <ul className="footer__nav">
        <li className="footer__nav__item">Github</li>
        <li className="footer__nav__item">Contacts</li>
        <li className="footer__nav__item">Rights</li>
      </ul>

      <div className="footer__back-to-top">
        <p>Back to top</p>
        <img
          src={ArrowUp}
          alt="arrow_up"
          className="footer__back-to-top__icon"
          onClick={scrollToTop}
        />
      </div>
    </footer>
  );
};
