import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegHeart, FaShoppingBag } from 'react-icons/fa'; // Importa ícones de coração e sacola
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        {/* Seção do logotipo/marca - ao clicar, navega para a página inicial */}
        <div className={styles.brand} onClick={() => navigate('/')}>
          <div className={styles.logoText}>
            <span className={styles.niceText}>NICE</span>
            <span className={styles.gadgetsText}>GADGETS</span>
          </div>
        </div>

        {/* Links de navegação */}
        <nav className={styles.nav}>
          <button 
            className={styles.navButton} 
            onClick={() => navigate('/')}
          >
            HOME
          </button>
          <button 
            className={styles.navButton} 
            onClick={() => navigate('/phones')}
          >
            PHONES
          </button>
          <button 
            className={styles.navButton} 
            onClick={() => navigate('/tablets')}
          >
            TABLETS
          </button>
          <button 
            className={styles.navButton} 
            onClick={() => navigate('/accessories')}
          >
            ACCESSORIES
          </button>
        </nav>
      </div>

      {/* Seção direita para ícones de favoritos e carrinho */}
      <div className={styles.rightSection}>
        <button 
          className={styles.iconButton} 
          onClick={() => navigate('/favorites')}
          aria-label="Favoritos"
        >
          <FaRegHeart className={styles.icon} />
        </button>
        
        <button 
          className={styles.iconButton} 
          onClick={() => navigate('/cart')}
          aria-label="Carrinho de compras"
        >
          <FaShoppingBag className={styles.icon} />
        </button>
      </div>
    </header>
  );
};

export default Header;