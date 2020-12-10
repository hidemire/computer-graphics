import React from 'react';

import Fractals from 'components/fractals/fractals';
import ColorModel from 'components/color-model/color-model';

export default [
  {
    path: '/',
    exact: true,
    component: () => <div>hello</div>,
  },
  {
    path: '/fractals',
    exact: true,
    component: () => <Fractals />,
  },
  {
    path: '/color-model',
    exact: true,
    component: () => <ColorModel />,
  },
];