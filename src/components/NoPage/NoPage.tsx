const NoPage = () => {
  return (
    <section className="mx-auto flex w-page flex-col items-center justify-between gap-8 px-8">
      <p className="">Sorry, page not found</p>
      <img
        src="/react_phone-catalog/img/page-not-found.png"
        alt=""
        className="w-1/2"
      />
    </section>
  );
};

export default NoPage;
