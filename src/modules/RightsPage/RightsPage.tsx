import styles from './RightsPage.module.scss';
export const RightsPage = () => {
  return (
    <div className={styles['pageGrid']}>
      <div className={styles.rights}>
        <section className={styles[`rights__section`]}>
        <h2 className={styles['rights__title']}>Copyright Notice</h2>
        <p className={styles['rights__copyright']}>
            © 2026 Nice Gadgets. All rights reserved.
          </p>
        <p className={styles['rights__text']}>All content available on this website, including text, images, logos,
          product descriptions, and design elements, is protected by applicable copyright laws. Unauthorized reproduction,
          distribution, or modification of any materials is prohibited without prior written permission.</p>
      </section>

      <section className={styles[`rights__section`]}>
        <h2 className={styles['rights__title']}>Product Information</h2>
        <p className={styles['rights__text']}>Nice Gadgets strives to provide accurate and up-to-date information about smartphones,
           tablets, and accessories. However, product specifications, availability, prices, and promotional offers may change
           without notice. </p>
        <p className={styles['rights__text']}>
           All trademarks, brand names, and product names belong to their respective owners and are used for identification
          purposes only.
        </p>
      </section>

      <section className={styles[`rights__section`]}>
        <h2 className={styles['rights__title']}>Terms of Use</h2>
        <p className={styles['rights__text']}>By using the Nice Gadgets website, you agree to use its content for personal and
          non-commercial purposes only. The store is not responsible for any losses or damages resulting from the use of
          information provided on this website.</p>
        <p className={styles['rights__text']}>
          For questions regarding copyright, intellectual property, or website content, please contact our customer
          support team.
        </p>
      </section>
      </div>
    </div>
  )
}
