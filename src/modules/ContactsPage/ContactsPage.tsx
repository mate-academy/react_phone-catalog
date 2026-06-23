import styles from './ContactsPage.module.scss'
export const ContactsPage = () => {
  return (
    <div className={styles.pageGrid}>
    <div className={styles['contacts']}>
      <section className={styles['contacts__section']}>
        <h2 className={styles['contacts__title']}>
          Visit our store</h2>
        <p className={styles['contacts__text']}>
          123 Innovation Street <br /> Kyiv, Ukraine</p>
        <p className={styles['contacts__text']}>
          Working hours: <br />
          Monday - Friday: 9:00 AM - 8:00 PM <br />
          Saturday - Sunday: 10:00 AM - 6:00 PM</p>
        </section>

        <section className={styles['contacts__section']}>
          <h2 className={styles['contacts__title']}>
            Customer Support</h2>
          <p className={styles['contacts__text']}>
            Need help choosing a device or tracking an order?</p>
           <ul className={styles.contacts__links}>
              <li>
                <a  href="tel:+380441234567"
                  className={styles.contacts__link}>
                  Phone: +380 (44) 123-45-67
                  </a>
              </li>
              <li>
                <a href="mailto:support@nicegadgets.com"
                  className={styles.contacts__link}>
                  Email: support@nicegadgets.com
                </a>
              </li>
            </ul>


          <p className={styles['contacts__text']}>
            Our support team is available every day to answer your questions and provide assistance.</p>
       </section>

       <section className={styles['contacts__section']}>
          <h2 className={styles['contacts__title']}>
            Online Store
          </h2>
          <p className={styles['contacts__text']}>
            Browse our latest collection of smartphones, tablets, accessories, and other tech products.</p>
          <p>
            GitHub Project:</p>
          <a href="https://github.com/ValentynaITCh"
          target="_blank"
          rel="noreferrer"
          className={styles.contacts__link}>
            https://github.com/ValentynaITCh
          </a>

       </section>
    </div>
    </div>
  )
}
