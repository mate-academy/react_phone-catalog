import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';

const BREADCRUBS_DATA = {
  category: { name: 'Rights', url: 'Rights' },
};

export const Rights = () => {
  return (
    <section className="rights">
      <div className="rights__breadcrumbs">
        <Breadcrumbs data={BREADCRUBS_DATA} />
      </div>
      <h1 className="rights__title text__h1">Rights and Terms of Use</h1>
      <p className="text__body">
        Welcome to the Rights and Terms of Use
        page of our online electronics store.
        This document outlines the rules and conditions that govern
        your use of our website and your purchases from our store.
        Please review these terms before using our services and making
        purchases.
      </p>

      <h2 className="rights__subtitle text__h2">1. Acceptance of Terms</h2>
      <p className="text__body">
        By using our website and making purchases
        from our store, you agree to the terms outlined
        on this page. If you do not agree with these terms,
        please do not use our site or make purchases.
      </p>

      <h2 className="rights__subtitle text__h2">2. User Responsibility</h2>
      <p className="text__body">
        You are responsible for using our site
        and maintaining the confidentiality of your account if
        one is created. Do not allow unauthorized access to your
        account and do not permit other users to use your account.
      </p>

      <h2 className="rights__subtitle text__h2">3. Privacy Policy</h2>
      <p className="text__body">
        We are committed to protecting your privacy
        and personal data. More information on the collection,
        use, and protection of your data can be found in our
        Privacy Policy.
      </p>
    </section>
  );
};
