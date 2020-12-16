import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Fab,
  FormControl,
  Grid,
  makeStyles,
  Paper,
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
import useDebounce from 'hooks/use-debounce';

import BaseTemplate from 'templates/base/base';
import Canvas from 'common/canvas/canvas';
import { CANVAS, EVENTS } from 'core/constants';
import Emitter from 'core/events';
import { drawLines, Point } from 'helpers/canvas';

import {
  getTranslationMatrix,
  getRotationMatrix,
} from './matrix';

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
  LEFT: 'left',
  RIGHT: 'right',
};

const DIRECTION = {
  LEFT: 'left',
  RIGHT: 'right',
};

const getTrianglePoint = (r, angle, { x, y }) => ({
  x: r * Math.cos(angle) + Number(x),
  y: r * Math.sin(angle) + Number(y),
});

const pointsToLines = (points) => ({ x, y }, index) => {
  const nextPoint = index + 1 === points.length ? 0 : index + 1;
  const p0 = new Point({ x, y });
  const p1 = new Point({ x: points[nextPoint].x, y: points[nextPoint].y });

  return { p0, p1 };
};

function Movement() {
  const classes = useStyles();

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState(100);
  const [angle, setAngle] = useState(30);
  const [rotation, setRotation] = useState(ROTATION.RIGHT);
  const [direction, setDirection] = useState(DIRECTION.RIGHT);

  const [points, setPoints] = useState([]);

  const debouncedAngle = useDebounce(angle, 1);

  useEffect(() => {
    const p = [
      getTrianglePoint(size, 0, position),
      getTrianglePoint(size, (1 / 3) * 2 * Math.PI, position),
      getTrianglePoint(size, (2 / 3) * 2 * Math.PI, position),
    ];

    setPoints(p);
  }, [position, size]);

  const movement = useCallback(() => {
    const p = [...points];

    const move = multiply(
      getTranslationMatrix(-position.x, -position.y),
      getRotationMatrix(debouncedAngle),
      getTranslationMatrix(position.x, position.y),
    );

    const newPoints = p.map(({ x, y }) => {
      const arr = multiply([x, y, 1], move).toArray();
      const [nx, ny] = arr;

      return { x: nx, y: ny };
    });

    return newPoints;
  }, [points, debouncedAngle, position]);

  const draw = useCallback(({ context }) => {
    context.beginPath();

    const lines = points.map(pointsToLines(points));

    drawLines(context, lines);

    // const newPoints = movement();
    // const newLines = newPoints.map(pointsToLines(newPoints));

    // drawLines(context, newLines);

    const grid = [
      { p0: new Point({ x: 0, y: 10000 }), p1: new Point({ x: 0, y: -10000 }) },
      { p0: new Point({ y: 0, x: 10000 }), p1: new Point({ y: 0, x: -10000 }) },
    ];

    drawLines(context, grid);

    context.closePath();
  }, [points, movement]);

  const handlePositionChange = (event, field) => {
    setPosition((p) => ({
      ...p,
      [field]: event.target.value,
    }));
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
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
            <Canvas draw={draw} name="img" />
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
                    Центр трикутника
                  </Typography>
                  <Grid container alignItems="center" justify="space-between">
                    <TextField
                      id="standard-number"
                      label="X"
                      type="number"
                      size="small"
                      style={{ width: '100px' }}
                      onChange={(e) => handlePositionChange(e, 'x')}
                      value={position.x}
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
                      onChange={(e) => handlePositionChange(e, 'y')}
                      value={position.y}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <Typography id="input-slider" variant="subtitle2" gutterBottom>
                    Розмір трикутника
                  </Typography>
                  <TextField
                    id="standard-number"
                    label=""
                    type="number"
                    size="small"
                    style={{ width: '100%' }}
                    onChange={handleSizeChange}
                    value={size}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
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
                  <Button variant="contained" size="medium" color="primary">
                    Play
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
