function TaskItem({ task, toggleTask, deleteTask }) {
  return (
    <li
      style={{
        listStyle: "none",
        padding: "12px",
        marginBottom: "10px",
        border: "1px solid #eee",
        transition: "all 0.25s ease",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "10px",
        background: task.completed ? "#f3f4f6" : "white",
      }}
    >
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flex: 1,
          cursor: "pointer",
        }}
      >
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
        />

        <span
          style={{
            textDecoration: task.completed
              ? "line-through"
              : "none",
              transition: "all 0.25s ease",
            color: task.completed ? "#777" : "#111",
          }}
        >
          {task.text}
        </span>
      </label>

      <button
        onClick={() => deleteTask(task.id)}
        style={{
          border: "1px solid #eee",
          background: "white",
          transition: "all 0.2s ease",
          color: "#d11a2a",
          borderRadius: "10px",
          padding: "8px 12px",
          cursor: "pointer",
        }}
      >
        Delete
      </button>
    </li>
  );
}

export default TaskItem;