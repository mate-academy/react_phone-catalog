import styles from './FavoritesPage.module.scss';

export const FavoritesPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>Favorites</h1>
      <p className={styles.underConstruction}>
        🚧 This page is under development! 🚧
      </p>

      <div className={styles.content}>
        <p>Planned features:</p>
        <ul>
          <li>⭐ Add/remove favorite products</li>
          <li>💾 Save favorites in local storage</li>
          <li>🔄 Sync favorites with header icon</li>
          <li>📜 Display favorite products as a list</li>
        </ul>
      </div>
    </div>
  );
};
