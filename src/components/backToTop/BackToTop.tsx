import { useContext } from 'react';
import Styles from './BackToTop.module.scss'
import { ContextApp } from '../../appContext/AppContext';

const scrollToHeader = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
  event.preventDefault();
  const headerElement = document.getElementById('header');
  if (headerElement) {
    headerElement.scrollIntoView({ behavior: 'smooth' });
  }
};

export const BackToTop: React.FC = () => {
  const {backToTop} = useContext(ContextApp)
  return (
    <div ref={backToTop} className={Styles['back']}>
        <p className={Styles['back__paragraph']}>Back to top</p>
        <a className={Styles['back__link']} onClick={scrollToHeader} href="#header">
        </a>
      </div>
  )
};


