import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Fab,
  FormControl,
  Grid,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Slider,
  TextField,
  Typography,
} from '@material-ui/core';
import {
  LiveHelp as LiveHelpIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  SettingsBackupRestore as SettingsBackupRestoreIcon,
} from '@material-ui/icons';
import { multiply } from 'mathjs';

import BaseTemplate from 'templates/base/base';
import Canvas from 'common/canvas/canvas';
import { CANVAS, EVENTS } from 'core/constants';
import Emitter from 'core/events';
import { drawLines, Point } from 'helpers/canvas';

import {
  getTranslationMatrix,
  getRotationMatrix,
} from './matrix';
import { getCenter, getThirdPoint } from './triangle';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  sticky: {
    position: 'sticky',
    top: theme.spacing(20),
    zIndex: theme.zIndex.appBar,
  },
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  formControl: {
    marginBottom: theme.spacing(3),
    width: '100%',
  },
  formLabel: {
    cursor: 'pointer',
  },
  input: {
    width: 42,
  },
  fill: {
    height: '100%',
    maxHeight: '100%',
    width: '100%',
    maxWidth: '100%',
  },
  rotateIcon: {
    transform: 'scaleX(-1)',
  },
}));

const ROTATION = {
  LEFT: 1,
  RIGHT: -1,
};

const DIRECTION = {
  LEFT: -1,
  RIGHT: 1,
};

const pointsToLines = (points) => ({ x, y }, index) => {
  const nextPoint = index + 1 === points.length ? 0 : index + 1;
  const p0 = new Point({ x, y });
  const p1 = new Point({ x: points[nextPoint].x, y: points[nextPoint].y });

  return { p0, p1 };
};

function Movement() {
  const classes = useStyles();

  const [P1, setP1] = useState({ x: 0, y: 0 });
  const [P2, setP2] = useState({ x: 0, y: 0 });

  const [P3Set, setP3Set] = useState([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);
  const [p3Rotation, setP3Rotation] = useState(0);

  const [angle, setAngle] = useState(180);
  const [rotation, setRotation] = useState(ROTATION.RIGHT);
  const [direction, setDirection] = useState(DIRECTION.RIGHT);

  const [points, setPoints] = useState([]);

  const [timer, setTimer] = useState(null);
  const [isPlayed, setIsPlayed] = useState(false);

  useEffect(() => {
    const P3set = getThirdPoint(P1, P2);
    setP3Set(P3set);
    const p = [
      P1,
      P2,
      P3set[p3Rotation],
    ];

    setPoints(p);
  }, [P1, P2, p3Rotation, isPlayed]);

  const stop = useCallback(() => {
    clearInterval(timer);
    setTimer(null);
    setIsPlayed(false);
  }, [timer]);

  const play = useCallback(() => {
    setIsPlayed(true);

    const center = getCenter(points);
    let currentAngle = 0;
    let currentPosition = 0;

    const angleStep = 3;
    const moveStep = 3 * direction;

    const t = setInterval(() => {
      const p = [...points];
      const a = currentAngle + angleStep;
      if (a > angle) {
        clearInterval(t);
        return;
      }
      currentAngle = a;

      currentPosition += moveStep;

      const move = multiply(
        getTranslationMatrix(-center.x, -center.y),
        getRotationMatrix(a * rotation),
        getTranslationMatrix(center.x, center.y),
        getTranslationMatrix(currentPosition, 0),
      );

      const newPoints = p.map(({ x, y }) => {
        const arr = multiply([x, y, 1], move).toArray();
        const [nx, ny] = arr;

        return { x: nx, y: ny };
      });

      setPoints(newPoints);
    }, 1000 / 60);

    setTimer(t);
  }, [rotation, direction, points, angle]);

  const draw = useCallback(({ context }) => {
    context.beginPath();

    const lines = points.map(pointsToLines(points));

    drawLines(context, lines);

    const grid = [
      { p0: new Point({ x: 0, y: 10000 }), p1: new Point({ x: 0, y: -10000 }) },
      { p0: new Point({ y: 0, x: 10000 }), p1: new Point({ y: 0, x: -10000 }) },
    ];

    drawLines(context, grid);

    context.closePath();
  }, [points]);

  const handlePointChange = (event, po, field) => {
    switch (po) {
      case 'P1':
        setP1((p) => ({
          ...p,
          [field]: event.target.value,
        }));
        break;
      case 'P2':
        setP2((p) => ({
          ...p,
          [field]: event.target.value,
        }));
        break;
      default:
        break;
    }
  };

  const handleThirdPointChange = (event) => {
    setP3Rotation(event.target.value);
  };

  const handleSliderChange = (event, newValue) => {
    setAngle(newValue);
  };

  const onSaveButtonClick = () => {
    Emitter.emit(`${CANVAS.MOVEMENT}:${EVENTS.SAVE_CANVAS_IMAGE}`, {});
  };

  return (
    <BaseTemplate>
      <Grid
        container
        component={Paper}
        className={classes.paper}
        elevation={3}
        justify="space-between"
        alignItems="center"
      >
        <Button color="primary" variant="contained">Рух</Button>
        <LiveHelpIcon fontSize="large" />
      </Grid>
      <Grid container spacing={3} style={{ height: '86vh' }}>
        <Grid item xs="9" style={{ height: '100%', maxHeight: '100%' }}>
          <Paper style={{ height: '100%', maxHeight: '100%' }}>
            <Canvas name={CANVAS.MOVEMENT} draw={draw} />
          </Paper>
        </Grid>
        <Grid item xs="3" style={{ height: '100%', maxHeight: '100%' }}>
          <Grid container direction="column" justify="space-between" style={{ height: '100%', maxHeight: '100%' }}>
            <Box>
              <Paper className={classes.paper}>
                <Box
                  fontWeight="fontWeightBold"
                  fontSize="subtitle2.fontSize"
                  textAlign="center"
                  className={classes.formControl}
                >
                  Налаштування
                </Box>
                <FormControl className={classes.formControl}>
                  <Typography id="input-slider" variant="subtitle2" gutterBottom>
                    Точка №1
                  </Typography>
                  <Grid container alignItems="center" justify="space-between">
                    <TextField
                      id="standard-number"
                      label="X"
                      type="number"
                      size="small"
                      style={{ width: '100px' }}
                      onChange={(e) => handlePointChange(e, 'P1', 'x')}
                      value={P1.x}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      id="standard-number"
                      label="Y"
                      style={{ width: '100px' }}
                      type="number"
                      size="small"
                      onChange={(e) => handlePointChange(e, 'P1', 'y')}
                      value={P1.y}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <Typography id="input-slider" variant="subtitle2" gutterBottom>
                    Точка №2
                  </Typography>
                  <Grid container alignItems="center" justify="space-between">
                    <TextField
                      id="standard-number"
                      label="X"
                      type="number"
                      size="small"
                      style={{ width: '100px' }}
                      onChange={(e) => handlePointChange(e, 'P2', 'x')}
                      value={P2.x}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      id="standard-number"
                      label="Y"
                      style={{ width: '100px' }}
                      type="number"
                      size="small"
                      onChange={(e) => handlePointChange(e, 'P2', 'y')}
                      value={P2.y}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <Typography id="input-slider" variant="subtitle2" gutterBottom>
                    Точка №3
                  </Typography>
                  <Select
                    displayEmpty
                    value={p3Rotation}
                    onChange={handleThirdPointChange}
                    className={classes.selectEmpty}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value={0}>{`X: ${P3Set[0].x} Y: ${P3Set[0].y}`}</MenuItem>
                    <MenuItem value={1}>{`X: ${P3Set[1].x} Y: ${P3Set[1].y}`}</MenuItem>
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <Typography id="input-slider" variant="subtitle2" gutterBottom>
                    Кут повороту
                  </Typography>
                  <Slider
                    value={angle}
                    min={0}
                    max={360}
                    onChange={handleSliderChange}
                    aria-labelledby="input-slider"
                    valueLabelDisplay="auto"
                    marks={[
                      { value: 0, label: '0' },
                      { value: 360, label: '360' },
                    ]}
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <Typography id="input-slider" variant="subtitle2" gutterBottom>
                    Напрям
                  </Typography>
                  <Grid container alignItems="center" justify="space-between">
                    <Grid item>
                      <Grid container spacing={1}>
                        <Grid item>
                          <Fab
                            disabled={direction === DIRECTION.LEFT}
                            onClick={() => setDirection(DIRECTION.LEFT)}
                            color="primary"
                            size="small"
                          >
                            <ArrowBackIcon />
                          </Fab>
                        </Grid>
                        <Grid item>
                          <Fab
                            disabled={direction === DIRECTION.RIGHT}
                            onClick={() => setDirection(DIRECTION.RIGHT)}
                            color="primary"
                            size="small"
                          >
                            <ArrowForwardIcon />
                          </Fab>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container spacing={1}>
                        <Grid item>
                          <Fab
                            disabled={rotation === ROTATION.LEFT}
                            onClick={() => setRotation(ROTATION.LEFT)}
                            color="primary"
                            size="small"
                          >
                            <SettingsBackupRestoreIcon />
                          </Fab>
                        </Grid>
                        <Grid item>
                          <Fab
                            disabled={rotation === ROTATION.RIGHT}
                            onClick={() => setRotation(ROTATION.RIGHT)}
                            color="primary"
                            size="small"
                          >
                            <SettingsBackupRestoreIcon className={classes.rotateIcon} />
                          </Fab>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <Button onClick={isPlayed ? stop : play} variant="contained" size="medium" color="primary">
                    {isPlayed ? 'Stop' : 'play'}
                  </Button>
                </FormControl>
              </Paper>
            </Box>
            <Box>
              <Grid container justify="space-between">
                <Fab onClick={onSaveButtonClick} variant="extended" color="primary">
                  Зберегти
                </Fab>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </BaseTemplate>
  );
}

export default Movement;
