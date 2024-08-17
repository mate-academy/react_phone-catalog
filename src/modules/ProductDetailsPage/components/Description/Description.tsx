import React from 'react';
import styles from './Description.module.scss';
import classNames from 'classnames';



export const Description: React.FC = () => {
  return (
    <section className={classNames(styles.descriptionSection, styles.section)}>
      <h3 className={styles.sectionTitle}>About</h3>
      <div className={styles.divider}></div>


          <article className={styles.descriptionSection}>
            <h4 className={styles.descriptionTitle}>XXX</h4>

              <p  className={styles.descriptionText}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus dignissimos odit magnam asperiores blanditiis illo ea sint accusantium eveniet. Molestias doloribus reprehenderit voluptatum sapiente blanditiis facilis optio soluta alias saepe? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi vel sequi nobis illo nisi quis commodi voluptates necessitatibus deleniti mollitia cupiditate dignissimos repudiandae, dicta odit delectus, consectetur officia veniam temporibus. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum dolore commodi repellendus, optio ipsa sequi fuga consequatur consequuntur amet quaerat aut tempore itaque odit eveniet, in suscipit ratione reiciendis dolores!
              </p>

          </article>

    </section>
  );
};
