import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { clearProductCart } from '../../store/slices/cartSlice';
import { Button as PurchaseButton } from '../../ui/Button/Button';

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClearProductsCart = () => {
    dispatch(clearProductCart());
  };

  return (
    <React.Fragment>
      <PurchaseButton appearance="primary" onClick={handleOpen} size="large">
        Checkout
      </PurchaseButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Checkout is not implemented yet. Do you want to clear the Cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClearProductsCart} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
