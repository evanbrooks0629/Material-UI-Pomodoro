import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Switch from '@mui/material/Switch';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import SettingsIcon from '@mui/icons-material/Settings';


export default function RestartDialog({ onClick }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('User');
  const [notifications, setNotifications] = React.useState(false);
  const [sound, setSound] = React.useState(true);
  const [skip, setSkip] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton aria-label="add" color="primary" variant="outlined" onClick={handleClickOpen}>
        <SettingsIcon color="primary" />
        </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
            <div style={{height: '8px'}} />
            <TextField
            id="outlined-number"
            label="Name"
            InputLabelProps={{
                shrink: true
            }}
            fullWidth={true}
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
            <div style={{height: '8px'}} />
            <FormControlLabel 
                control={<Switch checked={sound} onChange={() => setSound(!sound)} />}
                label={sound ? "Sound: On" : "Sound: Off"}
            />
            <div style={{height: '8px'}} />
            <FormControlLabel 
                control={<Switch checked={skip} onChange={() => setSkip(!skip)} />}
                label={skip ? "Skip through: On" : "Skip through: Off"}
            />
            <div style={{height: '8px'}} />
            <FormControlLabel 
                control={<Switch disabled checked={notifications} onChange={() => setNotifications(!notifications)} />}
                label={notifications ? "Notifications: On" : "Notifications: Off"}
            />
            <div style={{height: '8px'}} />

        </DialogContent>
        <DialogActions>
          <Button onClick={
            () => {
              handleClose();
              onClick(name, notifications, sound, skip);
            }
            }>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}