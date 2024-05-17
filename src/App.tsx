import {
  Outlet,
  // useLocation,
} from 'react-router-dom';
import './main.scss';
import { useContext } from 'react';
import { Header } from './modules/Header';
import { Footer } from './modules/Footer/Footer';
import { SidebarContext } from './store/SidebarContext';
import { Sidebar } from './modules/Sidebar';
// import { WindowsizeContext } from './store/WindowsizeContext';

export const App = () => {
  const { isOpenSidebar } = useContext(SidebarContext);
  // const { windowSizeContext, setWindowSizeContext } =
  //   useContext(WindowsizeContext);

  // const [windowSize, setWindowSize] = useState<number>(window.innerWidth);

  // const currentWindowSize = document.documentElement.clientWidth;
  // const { pathname } = useLocation();
  // const openSidebar = pathname === '/menu';

  // const [scrollPosition, setScrollPosition] = useState(0);

  // const { scrollY } = window;

  // useEffect(() => {
  //   if (isOpenSidebar) {
  //     setScrollPosition(scrollY);
  //     document.body.style.overflow = 'hidden';
  //     document.body.style.position = 'fixed';
  //     document.body.style.width = '100%';
  //     //     // console.log(scrollY);
  //   }

  //   if (!isOpenSidebar) {
  //     document.body.style.overflow = 'visible';
  //     // document.body.style.removeProperty('overflow');
  //     document.body.style.removeProperty('position');
  //     //     // document.body.style.removeProperty('top');
  //     document.body.style.removeProperty('width');
  //     window.scrollTo(0, scrollPosition);
  //     //     console.log(scrollY);

  //     //     setScrollPosition(0);
  //   }
  // }, [isOpenSidebar, scrollPosition, scrollY]);

  return (
    <div className="App">
      <Header />

      <div
        className="App__container"
        style={isOpenSidebar ? { height: 'calc(100vh - 48px)' } : {}}
      >
        <div
          className="App__sidebar"
          style={isOpenSidebar ? { right: 0 } : { right: '-100vw' }}
        >
          <Sidebar />
        </div>

        <Outlet />
        <Footer />
      </div>
    </div>
  );
};
