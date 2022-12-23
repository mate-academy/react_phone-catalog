import { Navigate, Route, Routes } from 'react-router-dom';
import { Footer } from 'globalSections/Footer';
import { useRef } from 'react';
import { HomePage } from './pages/HomePage/HomePage';
import { Header } from './globalSections/Header';
import 'styles/App.scss';

const App = () => {
  const scrollToRef = useRef(null);

  return (
    <div className="App">
      <Header scrollToRef={scrollToRef} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" />} />
      </Routes>

      <Footer scrollToRef={scrollToRef} />
    </div>
  );
};

export default App;
