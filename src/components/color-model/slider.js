import React, { memo, useMemo } from 'react';
import { Slider, withStyles } from '@material-ui/core';

function CustomSliderRaw({ backgroundImage, ...args }) {
  const CS = useMemo(() => withStyles({
    rail: {
      backgroundImage,
      borderRadius: '10px 10px 10px 10px',
      width: '10px !important',
      opacity: 1,
    },
    valueLabel: {
      visibility: 'visible',
      left: 'calc(-50% - 20px)',
      fontSize: 10,
      top: 0,
      '& *': {
        background: 'transparent',
        color: '#000',
      },
    },
    root: {
      width: '15px !important',
      marginRight: '0px !important',
    },
    track: {
      width: '2px !important',
      transition: 'all 0.7s !important',
      borderRadius: '10px 10px 15px 10px',
      left: 17,
    },
    thumb: {
      visibility: 'hidden',
      transition: 'all 0.7s !important',
    },
    mark: {
      visibility: 'hidden',
    },
    markLabel: {
      top: '10px !important',
      transform: 'translateY(100%) !important',
      fontSize: 10,
    },
  })(Slider), [backgroundImage]);

  return (
    <CS {...args} />
  );
}

const CustomSlider = memo(CustomSliderRaw);

export default CustomSlider;
