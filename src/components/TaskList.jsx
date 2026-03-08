import { useEffect, useRef } from "react";

function TaskList({
  tasks,
  toggleTask,
  deleteTask,
  editingId,
  editText,
  setEditText,
  startEdit,
  saveEdit,
  cancelEdit,
  colors,
}) {
  const editInputRef = useRef(null);

  useEffect(() => {
    if (editingId !== null && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [editingId]);

  const handleKeyDown = (e, id) => {
    if (e.key === "Enter") {
      saveEdit(id);
    }

    if (e.key === "Escape") {
      cancelEdit();
    }
  };

  return (
    <div style={{ display: "grid", gap: "10px" }}>
      {tasks.map((task) => {
        const isEditing = editingId === task.id;

        return (
          <div
            key={task.id}
            style={{
              border: `1px solid ${colors.border}`,
              borderRadius: "12px",
              padding: "12px",
              background: colors.cardBg,
              transition: "all 0.2s ease",
              boxShadow: isEditing
                ? "0 0 0 3px rgba(59, 130, 246, 0.12)"
                : "none",
            }}
          >
            {isEditing ? (
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <input
                  ref={editInputRef}
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, task.id)}
                  style={{
                    flex: 1,
                    minWidth: "180px",
                    padding: "10px 12px",
                    borderRadius: "10px",
                    border: `1px solid ${colors.border}`,
                    outline: "none",
                    background: colors.inputBg,
                    color: colors.text,
                  }}
                />

                <button
                  onClick={() => saveEdit(task.id)}
                  disabled={!editText.trim()}
                  style={{
                    padding: "10px 12px",
                    borderRadius: "10px",
                    border: `1px solid ${colors.border}`,
                    background: colors.button,
                    color: colors.success,
                    cursor: !editText.trim() ? "not-allowed" : "pointer",
                    opacity: !editText.trim() ? 0.6 : 1,
                    transition: "all 0.2s ease",
                  }}
                >
                  Save
                </button>

                <button
                  onClick={cancelEdit}
                  style={{
                    padding: "10px 12px",
                    borderRadius: "10px",
                    border: `1px solid ${colors.border}`,
                    background: colors.button,
                    color: colors.text,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    flex: 1,
                    cursor: "pointer",
                    minWidth: 0,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    style={{ cursor: "pointer" }}
                  />

                  <span
                    style={{
                      color: colors.text,
                      textDecoration: task.completed ? "line-through" : "none",
                      opacity: task.completed ? 0.6 : 1,
                      wordBreak: "break-word",
                    }}
                  >
                    {task.text}
                  </span>
                </label>

                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    flexShrink: 0,
                  }}
                >
                  {!task.completed && (
                    <button
                      onClick={() => startEdit(task)}
                      style={{
                        padding: "8px 12px",
                        borderRadius: "10px",
                        border: `1px solid ${colors.border}`,
                        background: colors.button,
                        color: colors.text,
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      Edit
                    </button>
                  )}

                  <button
                    onClick={() => deleteTask(task.id)}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "10px",
                      border: `1px solid ${colors.border}`,
                      background: colors.button,
                      color: colors.danger,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default TaskList;