import styles from '../BigLogo/BigLogoStyles.module.scss'

export function BigLogo() {
  return (
    <>
      <div className={styles.bigLogo}>
      <img src="/img/Logo.svg" alt="Logo" />
      </div>
    </>
  );
}
