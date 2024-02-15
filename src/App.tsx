import { Outlet } from "react-router-dom";
import "./App.scss";
import { NavBar } from "./components/header/Header";
import { Footer } from "./components/Footer";

const App = () => (
  <div className="App">
    <NavBar />
    <main className="main">
      <div className="main__container">
        <Outlet />
      </div>
    </main>
    <Footer />
  </div>
);

export default App;
