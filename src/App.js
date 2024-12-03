import { useState } from "react";
import { EditorState } from "draft-js";
import Editor from "./Component/TextEditor";
import Title from "./Component/Title";
import "./App.css";

function App() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  return (
    <div className="App">
      <Title editorState={editorState} />
      <Editor editorState={editorState} setEditorState={setEditorState} />
    </div>
  );
}

export default App;
