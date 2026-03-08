import { useState } from "react";

function TaskInput({ addTask }) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (text.trim() === "") return;

    addTask(text);
    setText("");
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <input
        type="text"
        placeholder="Add new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAdd();
        }}
        style={{
          flex: 1,
          padding: "12px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />

      <button
        onClick={handleAdd}
        style={{
          padding: "12px 16px",
          borderRadius: "10px",
          border: "none",
          background: "#4CAF50",
          color: "white",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        Add
      </button>
    </div>
  );
}

export default TaskInput;