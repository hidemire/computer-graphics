import React from 'react';

import BaseTemplate from 'templates/base/base';
import Article from 'common/article/article';

import data from './data';

function ColorModelInfo() {
  return (
    <BaseTemplate>
      <Article
        data={data}
      />
    </BaseTemplate>
  );
}

export default ColorModelInfo;
