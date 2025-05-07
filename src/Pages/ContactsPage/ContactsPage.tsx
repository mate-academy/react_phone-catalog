import styles from './ContactPage.module.scss';

export const ContactPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.element}>
        <h4>Firs name</h4>
        <h3>Andrii</h3>
      </div>
      <div className={styles.element}>
        <h4>Surname</h4>
        <h3>Boiko</h3>
      </div>
      <div className={styles.element}>
        <h4>E-mail</h4>
        <h3>
          <a href="mailto:andriy.boyko35@gmail.com">andriy.boyko35@gmail.com</a>
        </h3>
      </div>
      <div className={styles.element}>
        <h4>Phone number</h4>
        <h3>
          <a href="tel:+393881117964">+39 388 111 7964</a>
        </h3>
      </div>
      <div className={styles.element}>
        <h4>GitHub</h4>
        <h3>
          <a href="https://github.com/AndreaBoiko">AndreaBoiko</a>
        </h3>
      </div>
    </div>
  );
};
