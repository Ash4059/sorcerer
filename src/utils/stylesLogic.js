import { EditorState, Modifier } from "draft-js";
import { COMMANDS } from "./constant";

export const updateStyle = (
  editorState,
  contentState,
  selectionState,
  block,
  blockText
) => {
  let updateEditorState = editorState;
  Object.entries(COMMANDS).forEach(([command, style]) => {
    if (command === blockText) {
      const startOffset = 0;
      const endOffset = blockText.length;

      const clearedContentState = Modifier.setBlockType(
        contentState,
        selectionState.merge({
          anchorOffset: 0,
          focusOffset: blockText.length,
        }),
        ""
      );

      const contentStateWithoutPreviousInlineStyles = Modifier.replaceText(
        clearedContentState,
        selectionState.merge({
          anchorOffset: startOffset,
          focusOffset: endOffset,
        }),
        blockText.substring(startOffset, endOffset)
      );
      const updatedContentState = Modifier.applyInlineStyle(
        contentStateWithoutPreviousInlineStyles,
        selectionState.merge({
          anchorOffset: startOffset,
          focusOffset: endOffset,
        }),
        style
      );

      updateEditorState = EditorState.push(
        updateEditorState,
        updatedContentState,
        "change-inline-style"
      );
      return true;
    }
    return false;
  });

  return updateEditorState;
};
