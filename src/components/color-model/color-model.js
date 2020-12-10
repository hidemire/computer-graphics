import React, {
  useCallback,
  useRef,
  useState,
} from 'react';
import {
  Box,
  Button,
  Fab,
  FormControl,
  Grid,
  makeStyles,
  Paper,
  Slider,
  Typography,
} from '@material-ui/core';
import {
  LiveHelp as LiveHelpIcon,
} from '@material-ui/icons';

import { useDebouncedCallback } from 'use-debounce';

import BaseTemplate from 'templates/base/base';
import Canvas from 'common/canvas/canvas';
import {
  pixelData2RGBA,
  rgb2cmyk,
  rgb2hsl,
  calculatePosition,
  readFileAsync,
  hsl2Rgb,
  setRbgData,
} from 'helpers/image';

import useDebounce from 'hooks/use-debounce';
import Emitter from 'core/events';
import { CANVAS, EVENTS } from 'core/constants';

import CustomSlider from './slider';

const normalize = (val) => Math.floor(val);

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
}));

function ColorModel() {
  const classes = useStyles();
  const [blueBright, setBlueBright] = useState(0);
  const uploadButtonRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [hsl, setHsl] = useState({ h: 0, s: 0, l: 0 });
  const [cmyk, setCmyk] = useState({
    c: 0,
    m: 0,
    y: 0,
    k: 0,
  });

  const debounceHls = useDebounce(hsl, 5);
  const debounceCmyk = useDebounce(cmyk, 5);

  const handleSliderChange = (event, newValue) => {
    setBlueBright(newValue);
  };

  const onSaveButtonClick = () => {
    Emitter.emit(`${CANVAS.COLOR_MODEL}:${EVENTS.SAVE_CANVAS_IMAGE}`, {});
  };

  const onUploadButtonClick = () => {
    uploadButtonRef.current.click();
  };

  const onFileUpload = async (event) => {
    const [file] = event.target.files;
    const rf = await readFileAsync(file);
    const img = new Image();
    img.onload = () => {
      setSelectedImage(img);
    };
    img.src = rf;
  };

  const drawBaseImage = useCallback(({ context, canvas }) => {
    if (!selectedImage) return;

    context.setTransform(1, 0, 0, 1, 0, 0);

    const {
      newHeight,
      newWidth,
      xOffset,
      yOffset,
    } = calculatePosition({ canvas, selectedImage });

    context.drawImage(selectedImage, xOffset, yOffset, newWidth, newHeight);
  }, [selectedImage]);

  const drawUpdatedImage = useCallback(({ context, canvas }) => {
    if (!selectedImage) return;

    context.setTransform(1, 0, 0, 1, 0, 0);

    const {
      newHeight,
      newWidth,
      xOffset,
      yOffset,
    } = calculatePosition({ canvas, selectedImage });

    context.drawImage(selectedImage, xOffset, yOffset, newWidth, newHeight);
    const imageData = context.getImageData(xOffset, yOffset, newWidth, newHeight);

    const { data } = imageData;

    const range = 60;

    for (let i = 0; i < data.length; i += 4) {
      const hlsPoint = rgb2hsl(pixelData2RGBA(data, i));

      if (hlsPoint.h > 240 - range && hlsPoint.h < 240 + range) {
        const coef = (blueBright / 100) + 1;

        hlsPoint.l *= coef;

        if (hlsPoint.l > 1) hlsPoint.l = 1;
      }

      const rgbPoint = hsl2Rgb(hlsPoint);

      setRbgData(data, i, rgbPoint);
    }

    context.putImageData(imageData, xOffset, yOffset, 0, 0, newWidth, newHeight);
  }, [blueBright, selectedImage]);

  const pickDebounce = useDebouncedCallback(({ context, event }) => {
    const { layerX, layerY } = event;
    const pixel = context.getImageData(layerX, layerY, 1, 1);
    const rgb = pixelData2RGBA(pixel.data, 0);
    setCmyk(rgb2cmyk(rgb));
    setHsl(rgb2hsl(rgb));
  }, 50);

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
        <Button color="primary" variant="contained">Колірні моделі</Button>
        <LiveHelpIcon fontSize="large" />
      </Grid>
      <Grid container spacing={3} style={{ height: '86vh' }}>
        <Grid item xs="8" xl="9" style={{ height: '100%', maxHeight: '100%' }}>
          <Paper style={{ height: '100%', maxHeight: '100%' }}>
            <Grid container direction="row" spacing={3} justify="space-between" style={{ height: '100%', maxHeight: '100%' }}>
              <Grid item xs={6} style={{ height: '100%', maxHeight: '100%' }}>
                <Canvas draw={drawBaseImage} pick={pickDebounce.callback} name="img" />
              </Grid>
              <Grid item xs={6} style={{ height: '100%', maxHeight: '100%' }}>
                <Canvas
                  draw={drawUpdatedImage}
                  pick={pickDebounce.callback}
                  name={CANVAS.COLOR_MODEL}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs="4" xl="3" style={{ height: '100%', maxHeight: '100%' }}>
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
                    Яскравість синього
                  </Typography>
                  <Slider
                    value={blueBright}
                    min={-100}
                    max={100}
                    step={1}
                    onChange={handleSliderChange}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                  />
                </FormControl>
              </Paper>
              <Paper className={classes.paper}>
                <FormControl className={classes.formControl}>
                  <Grid container direction="row" spacing={1} justify="space-around">
                    <Grid item>
                      <Grid container direction="column" alignItems="center">
                        <Box mb={1}>
                          <Typography id="input-slider" variant="subtitle2" gutterBottom>
                            HSL
                          </Typography>
                        </Box>
                        <Grid container>
                          <CustomSlider
                            style={{ height: '200px' }}
                            orientation="vertical"
                            aria-labelledby="vertical-slider"
                            valueLabelDisplay="on"
                            backgroundImage="linear-gradient(0deg, hsla(0, 100%, 50%, 1),hsla(10, 100%, 50%, 1),hsla(20, 100%, 50%, 1),hsla(30, 100%, 50%, 1),hsla(40, 100%, 50%, 1),hsla(50, 100%, 50%, 1),hsla(60, 100%, 50%, 1),hsla(70, 100%, 50%, 1),hsla(80, 100%, 50%, 1),hsla(90, 100%, 50%, 1),hsla(100, 100%, 50%, 1),hsla(110, 100%, 50%, 1),hsla(120, 100%, 50%, 1),hsla(130, 100%, 50%, 1),hsla(140, 100%, 50%, 1),hsla(150, 100%, 50%, 1),hsla(160, 100%, 50%, 1),hsla(170, 100%, 50%, 1),hsla(180, 100%, 50%, 1),hsla(190, 100%, 50%, 1),hsla(200, 100%, 50%, 1),hsla(210, 100%, 50%, 1),hsla(220, 100%, 50%, 1),hsla(230, 100%, 50%, 1),hsla(240, 100%, 50%, 1),hsla(250, 100%, 50%, 1),hsla(260, 100%, 50%, 1),hsla(270, 100%, 50%, 1),hsla(280, 100%, 50%, 1),hsla(290, 100%, 50%, 1),hsla(300, 100%, 50%, 1),hsla(310, 100%, 50%, 1),hsla(320, 100%, 50%, 1),hsla(330, 100%, 50%, 1),hsla(340, 100%, 50%, 1),hsla(350, 100%, 50%, 1),hsla(360, 100%, 50%, 1))"
                            value={normalize(debounceHls.h)}
                            min={0}
                            max={360}
                            marks={[
                              { value: 0, label: '0°' },
                              { value: 360, label: '360°' },
                            ]}
                          />
                          <CustomSlider
                            style={{ height: '200px' }}
                            orientation="vertical"
                            aria-labelledby="vertical-slider"
                            valueLabelDisplay="on"
                            backgroundImage="linear-gradient(0deg, hsla(0, 0%, 50%, 1),hsla(0, 20%, 50%, 1),hsla(0, 40%, 50%, 1),hsla(0, 60%, 50%, 1),hsla(0, 80%, 50%, 1),hsla(0, 100%, 50%, 1))"
                            value={normalize(debounceHls.s * 100)}
                            min={0}
                            max={100}
                            marks={[
                              { value: 0, label: '0%' },
                              { value: 100, label: '100%' },
                            ]}
                          />
                          <CustomSlider
                            style={{ height: '200px' }}
                            orientation="vertical"
                            aria-labelledby="vertical-slider"
                            valueLabelDisplay="on"
                            backgroundImage="linear-gradient(0deg, hsla(0, 100%, 0%, 1),hsla(0, 100%, 20%, 1),hsla(0, 100%, 40%, 1),hsla(0, 100%, 60%, 1),hsla(0, 100%, 80%, 1),hsla(0, 100%, 100%, 1))"
                            value={normalize(debounceHls.l * 100)}
                            min={0}
                            max={100}
                            marks={[
                              { value: 0, label: '0%' },
                              { value: 100, label: '100%' },
                            ]}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container direction="column" alignItems="center">
                        <Box mb={1}>
                          <Typography id="input-slider" variant="subtitle2" gutterBottom>
                            CMYK
                          </Typography>
                        </Box>
                        <Grid container>
                          <CustomSlider
                            style={{ height: '200px' }}
                            orientation="vertical"
                            aria-labelledby="vertical-slider"
                            valueLabelDisplay="on"
                            backgroundImage="linear-gradient(.25turn, #00FFFF, #00FFFF)"
                            value={normalize(debounceCmyk.c * 100)}
                            min={0}
                            max={100}
                            marks={[
                              { value: 0, label: '0%' },
                              { value: 100, label: '100%' },
                            ]}
                          />
                          <CustomSlider
                            style={{ height: '200px' }}
                            orientation="vertical"
                            aria-labelledby="vertical-slider"
                            valueLabelDisplay="on"
                            backgroundImage="linear-gradient(.25turn, #FF00FF, #FF00FF)"
                            value={normalize(debounceCmyk.m * 100)}
                            min={0}
                            max={100}
                            marks={[
                              { value: 0, label: '0%' },
                              { value: 100, label: '100%' },
                            ]}
                          />
                          <CustomSlider
                            style={{ height: '200px' }}
                            orientation="vertical"
                            aria-labelledby="vertical-slider"
                            valueLabelDisplay="on"
                            backgroundImage="linear-gradient(.25turn, #FFFF00, #FFFF00)"
                            value={normalize(debounceCmyk.y * 100)}
                            min={0}
                            max={100}
                            marks={[
                              { value: 0, label: '0%' },
                              { value: 100, label: '100%' },
                            ]}
                          />
                          <CustomSlider
                            style={{ height: '200px' }}
                            orientation="vertical"
                            aria-labelledby="vertical-slider"
                            valueLabelDisplay="on"
                            backgroundImage="linear-gradient(.99turn, #000, #000)"
                            value={normalize(debounceCmyk.k * 100)}
                            min={0}
                            max={100}
                            marks={[
                              { value: 0, label: '0%' },
                              { value: 100, label: '100%' },
                            ]}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </FormControl>
              </Paper>
            </Box>
            <Box>
              <Grid container justify="space-between">
                <input
                  ref={uploadButtonRef}
                  onChange={onFileUpload}
                  type="file"
                  accept="image/*"
                  hidden
                />
                <Fab onClick={onUploadButtonClick} variant="extended" color="primary">
                  Завантажити
                </Fab>
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

export default ColorModel;
