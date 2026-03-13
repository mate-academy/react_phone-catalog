import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="layout-shell">
      <Header />

      <main className="layout-main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
