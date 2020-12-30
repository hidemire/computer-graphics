import React from 'react';

import Introduction from 'components/introduction/introduction';
import FractalsInfo from 'components/fractals-info/fractals-info';
import ColorModelInfo from 'components/color-model-info/color-model-info';
import MovementInfo from 'components/movement-info/movement-info';

import Fractals from 'components/fractals/fractals';
import ColorModel from 'components/color-model/color-model';
import Movement from 'components/movement/movement';

export default [
  {
    path: '/introduction',
    exact: true,
    component: () => <Introduction />,
  },
  {
    path: '/fractals/help',
    exact: true,
    component: () => <FractalsInfo />,
  },
  {
    path: '/color-model/help',
    exact: true,
    component: () => <ColorModelInfo />,
  },
  {
    path: '/movement/help',
    exact: true,
    component: () => <MovementInfo />,
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
  {
    path: '/movement',
    exact: true,
    component: () => <Movement />,
  },
];
