import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ToasterWrapper() {
  return (
    <ToastContainer
      position="bottom-right"
      transition={Bounce}
      closeButton
      autoClose={3000}
      hideProgressBar={false}
      pauseOnHover
      limit={3}
    />
  );
}
