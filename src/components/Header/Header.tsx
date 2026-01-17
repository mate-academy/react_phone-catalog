import styles from './Header.module.scss';

const navItems = [
  { label: 'Home', href: '#', isActive: true },
  { label: 'Phones', href: '#', isActive: false },
  { label: 'Tablets', href: '#', isActive: false },
  { label: 'Accessories', href: '#', isActive: false },
];

export const Header = () => (
  <header className={styles.header}>
    <div className={styles.container}>
      <a className={styles.logo} href="#">
        <img src="/img/Logo.svg" alt="Nice Gadgets" />
      </a>

      <nav className={styles.nav}>
        {navItems.map(item => (
          <a
            key={item.label}
            href={item.href}
            className={`${styles.navLink} ${item.isActive ? styles.isActive : ''}`}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className={styles.actions}>
        <a className={styles.action} href="#" aria-label="Favorites">
          <img src="/img/heart.svg" alt="Favorites" />
        </a>
        <a className={styles.action} href="#" aria-label="Cart">
          <img src="/img/shopping_cart.svg" alt="Cart" />
        </a>
      </div>

      <button className={styles.burger} type="button" aria-label="Menu">
        <img src="/img/burger_menu.svg" alt="Menu" />
      </button>
    </div>
  </header>
);
