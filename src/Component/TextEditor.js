import React, { useEffect } from "react";
import { Editor, EditorState, ContentState, convertFromRaw } from "draft-js";
import "draft-js/dist/Draft.css";

const contentState = (numberOfLines) => {
  let content = "";
  for (let i = 0; i < numberOfLines; i++) {
    content += "\n"; // Append new lines
  }
  return ContentState.createFromText(content);
};

const TextEditor = ({ editorState, setEditorState }) => {
  const style = {
    border: "2px solid #b2c7e4",
    height: "720px",
    overflowY: "auto",
    padding: "10px",
  };

  const handleEditChange = (newEditorState) => {
    setEditorState(newEditorState);
  }

  useEffect(() => {
    const savedState = localStorage.getItem("editorState");
    if (savedState) {
        try { 
            const contentState = convertFromRaw(JSON.parse(savedState)); 
            setEditorState(EditorState.createWithContent(contentState)); 
        } 
        catch (error) 
        { 
            console.error("Failed to load editor state:", error);
        }
    } else {
      setEditorState(EditorState.createWithContent(contentState(36)));
    }
  }, []);

  return (
    <div style={style}>
      <Editor
        editorState={editorState}
        onChange={handleEditChange}
      />
    </div>
  );
};

export default TextEditor;
