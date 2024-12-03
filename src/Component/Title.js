import { convertToRaw } from "draft-js";
import React from "react";

const Title = ({ editorState }) => {
  const handleSave = () => {
    const raw = convertToRaw(editorState.getCurrentContent());
    localStorage.setItem("editorState", JSON.stringify(raw));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 16px",
      }}
    >
      <h3 style={{ flexBasis: "calc(100% - 92px)", textAlign: "center" }}>
        Demo editor by Ashish Jaiswal
      </h3>
      <button
        style={{
          flexBasis: "86px",
          margin: "auto",
          fontWeight: "bold",
          padding: "4px 0",
          borderColor: "#b2c7e4",
        }}
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

export default Title;
