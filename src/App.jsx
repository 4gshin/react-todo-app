import { useEffect, useMemo, useState } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const colors =
    theme === "dark"
      ? {
          pageBg: "#0b0f19",
          cardBg: "#111827",
          text: "#e5e7eb",
          border: "#1f2937",
          button: "#1f2937",
          muted: "#9ca3af",
          activeFilterBg: "#e5e7eb",
          activeFilterText: "#111827",
          inputBg: "#0f172a",
          danger: "#ef4444",
          success: "#22c55e",
        }
      : {
          pageBg: "#f6f7fb",
          cardBg: "#ffffff",
          text: "#111827",
          border: "#e5e7eb",
          button: "#ffffff",
          muted: "#6b7280",
          activeFilterBg: "#111827",
          activeFilterText: "#ffffff",
          inputBg: "#ffffff",
          danger: "#d11a2a",
          success: "#16a34a",
        };

  const addTask = (text) => {
    const clean = text.trim();
    if (!clean) return;

    const newTask = {
      id: Date.now(),
      text: clean,
      completed: false,
    };

    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );

    if (editingId === id) {
      setEditingId(null);
      setEditText("");
    }
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));

    if (editingId === id) {
      setEditingId(null);
      setEditText("");
    }
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((t) => !t.completed));

    if (tasks.some((t) => t.id === editingId && t.completed)) {
      setEditingId(null);
      setEditText("");
    }
  };

  const startEdit = (task) => {
    if (task.completed) return;
    setEditingId(task.id);
    setEditText(task.text);
  };

  const saveEdit = (id) => {
    const clean = editText.trim();
    if (!clean) return;

    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: clean } : t))
    );

    setEditingId(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const filteredTasks = useMemo(() => {
    if (filter === "active") return tasks.filter((t) => !t.completed);
    if (filter === "completed") return tasks.filter((t) => t.completed);
    return tasks;
  }, [tasks, filter]);

  const doneCount = tasks.filter((t) => t.completed).length;

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "80px",
        background: colors.pageBg,
        transition: "background 0.3s ease",
      }}
    >
      <div style={{ width: "100%", maxWidth: "500px", padding: "0 20px" }}>
        <div
          style={{
            background: colors.cardBg,
            border: `1px solid ${colors.border}`,
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
            color: colors.text,
            transition: "all 0.3s ease",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1 style={{ margin: 0, fontSize: "22px" }}>My Todo</h1>

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              style={{
                padding: "8px 12px",
                borderRadius: "10px",
                border: `1px solid ${colors.border}`,
                background: colors.button,
                cursor: "pointer",
                color: colors.text,
                transition: "all 0.2s ease",
              }}
            >
              {theme === "dark" ? "Light" : "Dark"}
            </button>
          </div>

          <div
            style={{
              marginTop: "6px",
              fontSize: "13px",
              opacity: 0.8,
              color: colors.muted,
            }}
          >
            {doneCount}/{tasks.length} completed
          </div>

          <div style={{ marginTop: "16px" }}>
            <TaskInput addTask={addTask} />
          </div>

          <div
            style={{
              display: "flex",
              gap: "8px",
              marginTop: "16px",
              flexWrap: "wrap",
            }}
          >
            {["all", "active", "completed"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: "8px 12px",
                  borderRadius: "10px",
                  border: `1px solid ${colors.border}`,
                  background:
                    filter === f ? colors.activeFilterBg : colors.button,
                  color:
                    filter === f ? colors.activeFilterText : colors.text,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {f === "all"
                  ? "All"
                  : f === "active"
                  ? "Active"
                  : "Completed"}
              </button>
            ))}

            {filter === "completed" && doneCount > 0 && (
              <button
                onClick={clearCompleted}
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
                Clear Completed
              </button>
            )}
          </div>

          <div style={{ marginTop: "18px" }}>
            {filteredTasks.length === 0 ? (
              <div
                style={{
                  padding: "20px",
                  border: `1px dashed ${colors.border}`,
                  borderRadius: "12px",
                  textAlign: "center",
                  color: colors.muted,
                }}
              >
                No tasks yet 👇
              </div>
            ) : (
              <TaskList
                tasks={filteredTasks}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
                editingId={editingId}
                editText={editText}
                setEditText={setEditText}
                startEdit={startEdit}
                saveEdit={saveEdit}
                cancelEdit={cancelEdit}
                colors={colors}
              />
            )}
          </div>

          <div
            style={{
              marginTop: "20px",
              textAlign: "center",
              fontSize: "12px",
              color: colors.muted,
              letterSpacing: "0.3px",
            }}
          >
            Made by Agshin
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;