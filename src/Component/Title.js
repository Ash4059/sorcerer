import { convertToRaw } from "draft-js";
import React from "react";

const Title = ({ editorState }) => {
  const handleSave = () => {
    const raw = convertToRaw(editorState.getCurrentContent());
    localStorage.setItem("editorState", JSON.stringify(raw));
  };

  return (
    <div className="headerContainer" >
      <h3 style={{ flexBasis: "calc(100% - 92px)", textAlign: "center" }}>
        Demo editor by Ashish Jaiswal
      </h3>
      <button
        className="saveBtn"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

export default Title;
