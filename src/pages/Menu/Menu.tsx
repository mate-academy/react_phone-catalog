import { Navigation } from '../../components/Header/components/Navigation';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';
import { useWidth } from '../../hooks/useWidth';
import './Menu.scss';

export const Menu: React.FC = () => {
  const navigate = useNavigate();
  const width = useWidth();

  useEffect(() => {
    if (width > 640) {
      navigate('/');
    }
  }, [width, navigate]);

  return (
    <aside className="menu" style={{ overflow: 'hidden' }}>
      <Header />
      <Navigation className="menu__nav" />
    </aside>
  );
};
