import { FC } from 'react';

import styles from './RightsPage.module.scss';

export const RightsPage: FC = () => (
  <section className={styles.rightsPage}>
    <h1>User Rights</h1>

    <article>
      <h3>1. Right to Information</h3>
      <p>
        The user has the right to receive accurate and complete information
        about the product, its features, price, availability, delivery terms,
        and warranties.
      </p>
    </article>

    <article>
      <h3>2. Right to Return</h3>
      <p>
        The user has the right to return the product within 14 days after
        purchase, provided it has not been used and is kept in its original
        condition.
      </p>
    </article>

    <article>
      <h3>3. Right to Warranty Service</h3>
      <p>
        All products are subject to warranty service according to the terms
        specified by the manufacturer or the store.
      </p>
    </article>

    <article>
      <h3>4. Right to Privacy</h3>
      <p>
        User personal data is protected and used only for order processing, in
        accordance with the Privacy Policy.
      </p>
    </article>

    <article>
      <h3>5. Right to Secure Payment</h3>
      <p>
        All payments through the website are secure, and the user has the right
        to choose a convenient and safe payment method.
      </p>
    </article>

    <article>
      <h3>6. Right to Support</h3>
      <p>
        The user has the right to receive support regarding any questions
        related to the order, payment, or product delivery.
      </p>
    </article>

    <article>
      <h3>7. Right to Exchange</h3>
      <p>
        The user can exchange the product in case of defects or discrepancies
        with the stated specifications.
      </p>
    </article>
  </section>
);
