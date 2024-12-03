import { convertToRaw } from "draft-js";
import React from "react";

const Title = ({ editorState }) => {
  const saveEditorState = () => {
    const content = convertToRaw(editorState.getCurrentContent());
    localStorage.setItem("editorState", JSON.stringify(content));
  };

  return (
    <div className="headerContainer">
      <h3 style={{ flexBasis: "calc(100% - 92px)", textAlign: "center" }}>
        Demo editor by Ashish Jaiswal
      </h3>
      <button className="saveBtn" onClick={saveEditorState}>
        Save
      </button>
    </div>
  );
};

export default Title;
