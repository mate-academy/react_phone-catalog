import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import * as React from 'react';
import { useProductsCart } from '../../hooks/useProductsCart';
import { PurchaseButton } from '../../ui/PurchaseButton';

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);
  const { clearProductsCart } = useProductsCart();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClearProductsCart = () => {
    clearProductsCart();
  };

  return (
    <React.Fragment>
      <PurchaseButton handleClick={handleClickOpen} size="large">
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
