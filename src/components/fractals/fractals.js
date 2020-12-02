import React, { useState, useCallback } from 'react';
import {
  Grid,
  makeStyles,
  Paper,
  Button,
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  Input,
  Slider,
  Fab,
} from '@material-ui/core';
import {
  LiveHelp as LiveHelpIcon,
} from '@material-ui/icons';

import BaseTemplate from 'templates/base/base';
import Canvas from 'common/canvas/canvas';

import Emitter from 'core/events';
import { CANVAS, EVENTS } from 'core/constants';

import treeDrawer from './tree-drawer';
import snowflakeDrawer from './snowflake-drawer';

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
}));

const maxIterationsCount = 10;

const FRACTAL_TYPES = {
  TREE: 'tree',
  SNOWFLAKE: 'snowflake',
};

function Fractals() {
  const classes = useStyles();
  const [iterations, setIterations] = useState(1);
  const [fractalType, setFractalType] = useState(null);

  const handleSliderChange = (event, newValue) => {
    setIterations(newValue);
  };

  const normalizeIterations = (iter) => {
    if (iter < 0) {
      return 0;
    }
    if (iter > maxIterationsCount) {
      return maxIterationsCount;
    }
    return iter;
  };

  const handleInputChange = (event) => {
    setIterations(event.target.value === '' ? '' : (Number(event.target.value)));
  };

  const handleBlur = () => {
    setIterations(normalizeIterations(iterations));
  };

  const draw = useCallback(({ context }) => {
    if (fractalType === FRACTAL_TYPES.TREE) return treeDrawer(context, { iterations });
    if (fractalType === FRACTAL_TYPES.SNOWFLAKE) return snowflakeDrawer(context, { iterations });
    return () => {};
  }, [iterations, fractalType]);

  const onFractalTypeChange = (event) => {
    setFractalType(event.target.value);
  };

  const onSaveButtonClick = () => {
    Emitter.emit(`${CANVAS.FRACTALS}:${EVENTS.OPEN_CANVAS_IMAGE}`, {});
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
        <Button color="primary" variant="contained">Фрактали</Button>
        <LiveHelpIcon fontSize="large" />
      </Grid>
      <Grid container spacing={3} style={{ height: '86vh' }}>
        <Grid item xs="9" style={{ height: '100%', maxHeight: '100%' }}>
          <Paper style={{ height: '100%', maxHeight: '100%' }}>
            <Canvas draw={draw} name={CANVAS.FRACTALS} />
          </Paper>
        </Grid>
        <Grid item xs="3" style={{ height: '100%', maxHeight: '100%' }}>
          <Grid container direction="column" justify="space-between" style={{ height: '100%', maxHeight: '100%' }}>
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
                <Select
                  displayEmpty
                  value={fractalType}
                  onChange={onFractalTypeChange}
                  className={classes.selectEmpty}
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value={null} disabled>
                    Тип фракталу
                  </MenuItem>
                  <MenuItem value={FRACTAL_TYPES.TREE}>Дерево Піфагора</MenuItem>
                  <MenuItem value={FRACTAL_TYPES.SNOWFLAKE}>Cніжинка Коха</MenuItem>
                </Select>
                <FormHelperText>Тип фракталу</FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl}>
                <Typography id="input-slider" variant="subtitle2" gutterBottom>
                  Кількість ітерацій
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs>
                    <Slider
                      value={typeof iterations === 'number' ? iterations : 0}
                      marks
                      min={1}
                      max={maxIterationsCount}
                      step={1}
                      onChange={handleSliderChange}
                      aria-labelledby="input-slider"
                    />
                  </Grid>
                  <Grid item>
                    <Input
                      className={classes.input}
                      value={iterations}
                      margin="dense"
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      inputProps={{
                        step: 1,
                        min: 1,
                        max: maxIterationsCount,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                      }}
                    />
                  </Grid>
                </Grid>
              </FormControl>
            </Paper>
            <Box>
              <Fab onClick={onSaveButtonClick} variant="extended" color="primary">
                Зберегти
              </Fab>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </BaseTemplate>
  );
}

export default Fractals;
