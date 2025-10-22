import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { Sidebar } from './components/Sidebar';
import Footer from './components/Footer'

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <div className="layout">
      <Header onMenuClick={toggleSidebar} isOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} />
      <main className="main">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
