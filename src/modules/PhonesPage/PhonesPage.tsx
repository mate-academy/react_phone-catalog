import { getPhones } from '../../api/getPhones';

const PhonesPage = () => {
  getPhones().then(res => window.console.log(res));

  return <div>PhonesPage</div>;
};

export default PhonesPage;
