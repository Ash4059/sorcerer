import React, { useEffect } from "react";
import {
  Editor,
  EditorState,
  ContentState,
  convertFromRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { COMMANDS } from "../utils/constant";
import { updateStyle } from "../utils/stylesLogic";

const contentState = (numberOfLines) => {
  let content = "";
  for (let i = 0; i < numberOfLines; i++) {
    content += "\n"; // Append new lines
  }
  return ContentState.createFromText(content);
};

const TextEditor = ({ editorState, setEditorState }) => {
  useEffect(() => {
    const savedState = localStorage.getItem("editorState");
    if (savedState) {
      try {
        const contentState = convertFromRaw(JSON.parse(savedState));
        setEditorState(EditorState.createWithContent(contentState));
      } catch (error) {
        console.error("Failed to load editor state:", error);
      }
    } else {
      setEditorState(EditorState.createWithContent(contentState(36)));
    }
  }, []);

  const customStyleMap = {
    RED: {
      color: "red",
    },
    HEADER: {
        fontSize: "2em",
        fontWeight: "bold"
    }
  };

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };


  const handleBeforeInput = (char, currentEditorState) => {
    const contentState = currentEditorState.getCurrentContent();
    const selectionState = currentEditorState.getSelection();
    const startKey = selectionState.getStartKey();
    const block = contentState.getBlockForKey(startKey);
    const blockText = block.getText();

    if (char === " ") {
      const updateEditorState = updateStyle(editorState,contentState,selectionState,blockText);
      setEditorState(updateEditorState);
      if (Object.keys(COMMANDS).includes(blockText)) {
        return "handled";
      }
    }
    return "not-handled";
  };

  return (
    <div className="editor" >
      <Editor
        editorState={editorState}
        handleBeforeInput={handleBeforeInput}
        customStyleMap={customStyleMap}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default TextEditor;
