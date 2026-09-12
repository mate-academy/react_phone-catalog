import {Link} from 'react-router-dom';

export const RightsPage = () => (
  <section className="legalPage">
    <h1>Copyright and project information</h1>
    <p>
      © {new Date().getFullYear()} Mykhailo Loniak. This portfolio project is
      distributed under the GPL-3.0 license.
    </p>
    <p>
      Product names, trademarks and images belong to their respective owners and
      are used here solely to demonstrate a frontend catalog interface.
    </p>
    <p>
      This website is a frontend demo. It does not process orders, payments or
      personal customer information.
    </p>
    <Link to="/">Return to the catalog</Link>
  </section>
);
