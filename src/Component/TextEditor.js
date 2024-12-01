import React, { useEffect } from "react";
import { Editor, EditorState, ContentState, convertFromRaw, Modifier, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";

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

  const style = {
    border: "2px solid #b2c7e4",
    height: "720px",
    overflowY: "auto",
    margin: "18px",
    padding: "0px 16px",
  };

  const handleEditChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleBeforeInput = (chars, editorState) => {
      const currentContent = editorState.getCurrentContent();
      const selection = editorState.getSelection();
      const startKey = selection.getStartKey();
      const startOffset = selection.getStartOffset();

      let newEditorState = editorState;

      if(chars === ' ' && startOffset > 0 && startOffset < 4) {
          const block = currentContent.getBlockForKey(startKey);
          const text = block.getText();

          if(text === '#') {
            const newContentState = Modifier.replaceText(
              currentContent,
              selection.merge({
                anchorOffset: 0,
                focusOffset: 1
              }),
              ''
            );
            newEditorState = EditorState.push(
              editorState,
              newContentState,
              'change-block-type'
            );
            newEditorState = RichUtils.toggleBlockType(
                newEditorState,
                'header-one'
            );
            setEditorState(newEditorState);
            return 'handled';
          }

          if(text === '*') {
            const newContentState = Modifier.replaceText(
              currentContent,
              selection.merge({
                anchorOffset: 0,
                focusOffset: 1
              }),
              ''
            );
            newEditorState = EditorState.push(
              editorState,
              newContentState,
              'change-inline-style'
            );
            newEditorState = RichUtils.toggleInlineStyle(
                newEditorState,
                'BOLD'
            );
            setEditorState(newEditorState);
            return 'handled';
          }
          if(text === '**'){
            const newContentState = Modifier.replaceText(
              currentContent,
              selection.merge({
                anchorOffset: 0,
                focusOffset: 2
              }),
              ''
            );
            newEditorState = EditorState.push(
              editorState,
              newContentState,
              'change-inline-style'
            );
            newEditorState = RichUtils.toggleInlineStyle(
                newEditorState,
                'RED'
            );
            setEditorState(newEditorState);
            return 'handled';
          }
          if(text === '***') {
            const newContentState = Modifier.replaceText(
              currentContent,
              selection.merge({
                anchorOffset: 0,
                focusOffset: 3
              }),
              ''
            );
            newEditorState = EditorState.push(
              editorState,
              newContentState,
              'change-inline-style'
            );
            newEditorState = RichUtils.toggleInlineStyle(
                newEditorState,
                'UNDERLINE'
            );
            setEditorState(newEditorState);
            return 'handled';
          }
          return 'not-handled';
      }
  }

  return (
    <div style={style}>
      <Editor
        editorState={editorState}
        handleBeforeInput={handleBeforeInput}
        onChange={handleEditChange}
      />
    </div>
  );
};

export default TextEditor;
