import './RightsPage.scss';

export const RightsPage = () => {
  return (
    <div className="rights">
      <h1 className="rights__title">Rights</h1>
      <section className="rights__section">
        <h2 className="rights__h2">Your Rights</h2>
        <p className="rights__text">
          Here we describe the rights and responsibilities you have when using
          our services. This includes privacy rights, intellectual property
          rights, and any other relevant rights.
        </p>
        <h3 className="rights__h3">Privacy Rights</h3>
        <p className="rights__text">
          We are committed to protecting your privacy. You have the right to
          know how your data is being used and to request deletion or correction
          of your data.
        </p>
        <h3 className="rights__h3">Intellectual Property Rights</h3>
        <p className="rights__text">
          All content provided on this site is owned by us or our licensors and
          is protected by intellectual property laws. You have the right to
          access this content but must not use it in a way that infringes these
          rights.
        </p>
      </section>
    </div>
  );
};
