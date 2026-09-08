import { useContext } from 'react';
import styles from './CheckoutButton.module.scss';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CartContext } from '../../context/CartContext';
import './modal.scss';

export const CheckoutButton = () => {
  const { setCart } = useContext(CartContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClear = () => {
    setCart([]);
    handleClose();
  };

  return (
    <>
      <button className={styles.checkoutButton} onClick={handleShow}>
        Checkout
      </button>

      <div className={styles.modal}>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          dialogClassName="custom-modal"
        >
          <Modal.Body>
            Checkout is not implemented yet. Do you want to clear the Cart?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleClear}>
              Clear
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};
