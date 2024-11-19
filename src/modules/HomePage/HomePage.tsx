import style from './HomePage.module.scss';

export const HomePage = () => (
  <div className={style.homePage}>
    <div className={style.header}>
      <h1 style={{ visibility: 'hidden' }}>Product Catalog</h1>
      <h2 className={style.title}>Welcome to Nice Gadgets store!</h2>
    </div>
  </div>
);
