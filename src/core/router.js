import React from 'react';

import Fractals from 'components/fractals/fractals';

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
];
