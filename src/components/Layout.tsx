import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Header />

      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "20px",
          minHeight: "80vh",
        }}
      >
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default Layout;