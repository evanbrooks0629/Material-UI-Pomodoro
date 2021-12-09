import './App.css';
import { Grid, Typography, Button, IconButton } from '@mui/material';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { useState, useEffect } from 'react';
import AddDialog from './AddDialog';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SettingsDialog from './SettingsDialog';
import ResetDialog from './ResetDialog';
import useSound from 'use-sound';
import successSound from './sounds/success.mp3';
import breakSound from './sounds/break.mp3';
import timerSound from './sounds/timer.mp3';

function App() {

  const [minutes, setMinutes] = useState(45);
  const [seconds, setSeconds] = useState(0);
  const [isBreak, setBreak] = useState(false);
  const [isOn, toggle] = useState(false);
  
  const [numTimers, setNumTimers] = useState(3);
  const [timerLength, setTimerLength] = useState(45);
  const [breakLength, setBreakLength] = useState(15);

  const [name, setName] = useState('User');
  const [hasNotifications, setNotifications] = useState(false);
  const [hasSound, setSound] = useState(true);
  const [skip, setSkip] = useState(false);

  const [currTimer, setCurrTimer] = useState(1);
  const [currBreak, setCurrBreak] = useState(1);

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('Time to focus!');

  const [playSuccess] = useSound(successSound);
  const [playTimer] = useSound(timerSound);
  const [playBreak] = useSound(breakSound);

  useEffect(() => {
    const date = new Date();
    const hour = date.getHours();
    if (hour < 4 || hour > 16) {
      setTitle(`Good Evening, ${name}`);
    } else if (hour > 4 && hour < 11) {
      setTitle(`Good Morning, ${name}`);
    } else {
      setTitle(`Good Afternoon, ${name}`);
    }
  }, [name])
  
  useEffect(()=>{
    if (isOn) {
      let myInterval = setInterval(() => {
        if (seconds > 0) {
            setSeconds(seconds - 1);
        }
        if (seconds === 0) {
            if (minutes === 0) {
                // BREAK
                if (isBreak) {
                    if (hasSound) {
                      playBreak();
                    }
                    createTimer();
                } else {
                  // NOT BREAK
                  if (currTimer >= numTimers) {
                    // DONE
                    createDone();
                    if (hasSound) {
                      playSuccess();
                    }
                    toggle(false);
                  } else {
                    // NOT DONE
                    if (hasSound) {
                      playTimer();
                    }
                    createBreak();
                  }
                }
                clearInterval(myInterval);
            } else {
                setMinutes(minutes - 1);
                setSeconds(59);
            }
        } 
    }, 1000);

    return () => {
        clearInterval(myInterval);
      };
    } 
  });

  const handleCreate = (num, len1, len2) => {
    setNumTimers(num);
    setTimerLength(len1);
    setBreakLength(len2);
    setMinutes(len1);
    setTitle(`Session ${currTimer} of ${num}`);
  }

  const handleSettings = (name, notifications, sound, skip) => {
    setName(name);
    setNotifications(notifications);
    setSound(sound);
    setSkip(skip);
  }

  const handleReset = didReset => {
    if (didReset) {
      setMinutes(45);
      setSeconds(0);
      setBreak(false);
      toggle(false);
      setNumTimers(3);
      setTimerLength(45);
      setBreakLength(15);
      setCurrTimer(1);
      setCurrBreak(1);
      const date = new Date();
      const hour = date.getHours();
      if (hour < 4 || hour > 16) {
        setTitle(`Good Evening, ${name}`);
      } else if (hour > 4 && hour < 11) {
        setTitle(`Good Morning, ${name}`);
      } else {
        setTitle(`Good Afternoon, ${name}`);
      }
      setSubtitle('Time to focus!');
    }
  }

  const createTimer = () => {
    setCurrTimer(currTimer+1);
    setBreak(false);
    setTitle(`Session ${currBreak} of ${numTimers}`);
    setSubtitle('Time to focus!');
    setMinutes(timerLength);
    setSeconds(0);
    if (!skip) {
      toggle(false);
    }
  }

  const createBreak = () => {
    setCurrBreak(currBreak+1);
    setBreak(true);
    setTitle('Break Time!');
    setSubtitle('Take a break!');
    setMinutes(breakLength);
    setSeconds(0);
    if (!skip) {
      toggle(false);
    }
  }

  const createDone = () => {
    setTitle('Done!');
    setSubtitle('Good job!');
    setMinutes(0);
    setSeconds(0);
    setNumTimers(0);
    setTimerLength(0);
    setBreakLength(0);
    toggle(false);
  }

  const handleSkip = () => {
    if (isBreak) {
      createTimer();
    } else {
      if (currTimer >= numTimers) {
        createDone();
      } else {
        createBreak();
      }
    }
  }

  return (
    <div className="App">
      <Grid container>
        <Grid container>
          <Grid container>
            <Grid item xs={12}>
              <div style={{height: '35px'}}></div>
              <Typography variant="h4" style={{color: "grey"}}>{title}</Typography>
              <div style={{height: '50px'}}></div>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs = {1} />
            <Grid item xs = {10}>
              <Typography style={{color: "#eeeeee"}} variant="h1">{minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}</Typography>
            </Grid>
            <Grid item xs = {1} />
          </Grid>
          <Grid item xs={12}>
              <div style={{height: '15px'}}></div>
          </Grid>
          <Grid container>
            <Grid item xs={4}>
            <Button variant="contained" startIcon={<PlayCircleIcon />} onClick={
              () => {
                toggle(true);
                if (!isBreak) {
                  setTitle(`Session ${currTimer} of ${numTimers}`);
                } else {
                  setTitle('Break Time!');
                }
                }
              }>
              Start
            </Button>
            </Grid>
            <Grid item xs={4}>
              <Typography style={{color: "grey"}} variant="h5">{subtitle}</Typography>
            </Grid>
            <Grid item xs={4}>
            <Button variant="outlined" endIcon={<StopCircleIcon />} onClick={() => toggle(false)}>
              Stop
            </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{height: '90px'}} />
        <Grid container>
          <Grid item xs={2}>
            <IconButton aria-label="add" color="primary" variant="outlined" onClick={handleSkip}>
              <ArrowForwardIcon color="primary" />
            </IconButton>
          </Grid>
          <Grid item xs={2}>
            <ResetDialog
            onClick={handleReset}
            />
          </Grid>
          <Grid item xs={4} />
          <Grid item xs={2}>
            <AddDialog 
            onClick={handleCreate}
            /> 
          </Grid>
          <Grid item xs={2}>
            <SettingsDialog 
            onClick={handleSettings}
            /> 
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
