
"use client"

import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';

const MarkdownEditor = () => {
  const [value, setValue] = useState("");

  return (
    <div className="flex flex-col w-full gap-8">
      <div >
        <MDEditor.Markdown source={value} />
      </div>
      <MDEditor
        value={value}
        // @ts-ignore
        onChange={setValue}
      />
    </div>
  );
};

export default MarkdownEditor;
