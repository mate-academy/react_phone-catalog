import { App } from './App';
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { HomePage } from './components/HomePage/HomePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { NavBarMobile } from './components/NavBar/NavBarMobile';
import { MobilePhones } from './components/MobilePhonesPage/MobilePhones';
import { PhonePage } from './components/MobilePhonesPage/Phone';
// import { NavBarMobile } from './components/NavBar/NavBarMobile/NavBarMobile';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="menu" element={<NavBarMobile />} />
        <Route path="phones" element={<MobilePhones />}>
          <Route path=":phoneId" element={<PhonePage />} />
        </Route>
        {/* temporary !!!!!!!!!!!!1 */}
        {/* <Route path="tablets" element={<Phone />} /> */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
