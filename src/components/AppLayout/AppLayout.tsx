import {Outlet} from 'react-router-dom';

import {Header} from './Header';
import {Footer} from './Footer';
import {Seo} from '../Seo';

import style from './AppLayout.module.scss';

export const AppLayout: React.FC = () => (
  <>
    <Seo />
    <Header />
    <div className={style.outlet}>
      <Outlet />
    </div>
    <Footer />
  </>
);
