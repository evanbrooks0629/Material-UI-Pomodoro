import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import AddAlarmIcon from '@mui/icons-material/AddAlarm';

export default function AddDialog({ onClick }) {
  const [open, setOpen] = React.useState(false);
  const [numTimers, setNumTimers] = React.useState('');
  const [timerLength, setTimerLength] = React.useState('');
  const [breakLength, setBreakLength] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNumTimers('');
    setTimerLength('');
    setBreakLength('');
  };

  return (
    <React.Fragment>
      <IconButton aria-label="add" color="primary" variant="outlined" onClick={handleClickOpen}>
        <AddAlarmIcon color="primary" />
        </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Create a New Pomodoro Timer</DialogTitle>
        <DialogContent>
            <div style={{height: '8px'}} />
            <TextField
            id="outlined-number"
            label="Number of Sessions"
            type="number"
            InputLabelProps={{
                shrink: true
            }}
            InputProps={{
                endAdornment: <InputAdornment position="end">sessions</InputAdornment>
            }}
            fullWidth={true}
            value={numTimers}
            onChange={(e) => setNumTimers(e.target.value)}
            />
            <div style={{height: '8px'}} />
            <TextField
            id="outlined-number"
            label="Timer Length"
            type="number"
            InputLabelProps={{
                shrink: true
            }}
            InputProps={{
                endAdornment: <InputAdornment position="end">minutes</InputAdornment>
            }}
            fullWidth={true}
            value={timerLength}
            onChange={(e) => setTimerLength(e.target.value)}
            />
            <div style={{height: '8px'}} />
            <TextField
            id="outlined-number"
            label="Break Length"
            type="number"
            InputLabelProps={{
                shrink: true,
            }}
            InputProps={{
                endAdornment: <InputAdornment position="end">minutes</InputAdornment>
            }}
            fullWidth={true}
            value={breakLength}
            onChange={(e) => setBreakLength(e.target.value)}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={
            () => {
              handleClose();
              onClick(numTimers, timerLength, breakLength);
            }
            
            }>Create</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}