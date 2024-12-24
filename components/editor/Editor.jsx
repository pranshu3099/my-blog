import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-tomorrow_night";

const EditorComponent = ({ blog, dispatch }) => {
  return (
    <div className="bg-blue-900 w-[1500px]">
      <AceEditor
        mode="markdown"
        theme="tomorrow_night"
        value={blog?.blogContent || ""}
        name="markdown-editor"
        editorProps={{ $blockScrolling: true }}
        onChange={(e) => {
          dispatch({ type: "content", payload: { blogContent: e } });
        }}
        width="1800px"
      />
    </div>
  );
};

export default EditorComponent;
