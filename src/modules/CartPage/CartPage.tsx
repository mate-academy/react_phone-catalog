import styles from './CartPage.module.scss';

export const CartPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>Shopping Cart</h1>
      <p className={styles.underConstruction}>
        🚧 This page is under construction! 🚧
      </p>

      <div className={styles.content}>
        <p>Planned features:</p>
        <ul>
          <li>🛍 Add/remove items</li>
          <li>📊 Price calculation</li>
          <li>💾 Save cart in local storage</li>
          <li>🔄 Sync cart with header icon</li>
          <li>➖➕ Change item quantity</li>
        </ul>
      </div>
    </div>
  );
};
