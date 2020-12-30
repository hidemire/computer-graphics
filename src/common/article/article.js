import React, { useEffect, useState } from 'react';
import EditorJs from '@editorjs/editorjs';

import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import Paragraph from '@editorjs/paragraph';
import List from '@editorjs/list';
import Warning from '@editorjs/warning';
import Code from '@editorjs/code';
import LinkTool from '@editorjs/link';
import Raw from '@editorjs/raw';
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import CheckList from '@editorjs/checklist';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';
import SimpleImage from '@editorjs/simple-image';
import TextColor from '@rogierw/editor-js-text-color';

import './style.css';

const tools = {
  embed: Embed,
  table: Table,
  list: List,
  warning: Warning,
  code: Code,
  linkTool: LinkTool,
  raw: Raw,
  header: Header,
  quote: Quote,
  marker: Marker,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  image: SimpleImage,
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  textColor: TextColor,
};

function Article({ data }) {
  const [holder] = useState(
    (Math.floor(Math.random() * 1000) + Date.now()).toString(16),
  );

  useEffect(() => {
    const instance = new EditorJs({
      holder,
      tools,
      data,
      readOnly: true,
      minHeight: '100px',
    });

    return () => instance.isReady.then(() => instance.destroy());
  }, []);

  return (
    <div id={holder} />
  );
}

export default Article;
