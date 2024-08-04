import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Phones from "./components/Phones/Phones";
import Tablets from "./components/Tablets/Tablets";
import Assesories from "./components/Assesories/Assesories";

const App = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/phones" element={<Phones />} />
        <Route path="/tablets" element={<Tablets />} />
        <Route path="/accessories" element={<Assesories />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
