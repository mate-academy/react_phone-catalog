import GoBackLink from '../Blocks/GoBackLink';

const PhoneNotFound = () => {
  return (
    <main className="not-found">
      <h1>
        Product was not found. Please try later.
      </h1>
      <GoBackLink />
    </main>
  );
};

export default PhoneNotFound;
