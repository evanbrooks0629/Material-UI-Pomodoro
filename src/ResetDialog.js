import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export default function ResetDialog({ onClick }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton aria-label="add" color="primary" variant="outlined" onClick={handleClickOpen}>
        <RestartAltIcon color="primary" />
        </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Reset</DialogTitle>
        <DialogContent>
            <div style={{height: '8px'}} />
            <Typography>Are you sure you want to reset the session?</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={
            () => {
              handleClose();
              onClick(true);
            }
            }>Reset</Button>
            <Button onClick={
            () => {
              handleClose();
            }
            }>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}